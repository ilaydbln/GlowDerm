"""
Mevcut HTML, CSS, JS ve görselleri sunar.
Korumalı içerik erişimi istemci tarafında (modal + oturum) yönetilir.
"""
import json
import mimetypes
from pathlib import Path

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import FileResponse, Http404, HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods

from .models import Routine
ALLOWED_EXTENSIONS = {
    ".css",
    ".gif",
    ".html",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".png",
    ".svg",
    ".webp",
    ".woff",
    ".woff2",
}

BLOCKED_PREFIXES = (
    "glowderm/",
    "core/",
    "accounts/",
    "venv/",
    ".venv/",
    ".git/",
    "__pycache__/",
    ".vscode/",
    "templates/",
)

BLOCKED_NAMES = {
    "manage.py",
    "requirements.txt",
    "db.sqlite3",
    ".env",
}

def _resolve_site_path(relative_path: str) -> Path:
    base = settings.BASE_DIR.resolve()
    target = (base / relative_path).resolve()

    if not str(target).startswith(str(base)):
        raise Http404()

    if target.name in BLOCKED_NAMES:
        raise Http404()

    rel = target.relative_to(base).as_posix()
    if any(rel.startswith(prefix) for prefix in BLOCKED_PREFIXES):
        raise Http404()

    if target.suffix.lower() not in ALLOWED_EXTENSIONS:
        raise Http404()

    if not target.is_file():
        raise Http404()

    return target


def auth_context_js(request):
    """Tüm sayfalarda giriş durumunu JS tarafına aktarır."""
    payload = {
        "loggedIn": request.user.is_authenticated,
        "username": request.user.username if request.user.is_authenticated else None,
        "csrfToken": get_token(request),
        "loginUrl": settings.LOGIN_URL,
        "registerUrl": "/accounts/kayit/",
        "loginApi": "/accounts/api/giris/",
        "registerApi": "/accounts/api/kayit/",
        "logoutUrl": "/accounts/cikis/",
        "routineApi": "/api/routine/me/",
    }
    body = "window.GLOWDERM_AUTH=" + json.dumps(payload, ensure_ascii=False) + ";"
    return HttpResponse(body, content_type="application/javascript; charset=utf-8")


@login_required
@csrf_protect
@require_http_methods(["GET", "POST"])
def routine_me_api(request):
    if request.method == "GET":
        try:
            routine = request.user.routine
        except Routine.DoesNotExist:
            return JsonResponse(
                {"detail": "Rutininizi görmek için önce quizi tamamlayın."},
                status=404,
            )

        return JsonResponse(
            {
                "answers": routine.answers,
                "routine": routine.routine,
                "updatedAt": routine.updated_at.isoformat(),
            }
        )

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Geçersiz JSON."}, status=400)

    answers = payload.get("answers")
    routine_data = payload.get("routine")
    if not isinstance(answers, list) or not isinstance(routine_data, list):
        return JsonResponse({"detail": "answers ve routine liste olmalıdır."}, status=400)

    routine, _ = Routine.objects.update_or_create(
        user=request.user,
        defaults={
            "answers": answers,
            "routine": routine_data,
        },
    )
    return JsonResponse(
        {
            "ok": True,
            "answers": routine.answers,
            "routine": routine.routine,
            "updatedAt": routine.updated_at.isoformat(),
        }
    )


def serve_site_file(request, path=""):
    if not path or path.endswith("/"):
        path = "index.html"

    file_path = _resolve_site_path(path)
    content_type, _ = mimetypes.guess_type(file_path.name)
    return FileResponse(
        open(file_path, "rb"),
        content_type=content_type or "application/octet-stream",
    )
