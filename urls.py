from django.urls import include, path, re_path

from core import views

urlpatterns = [
    path("accounts/", include("accounts.urls")),
    path("api/routine/me/", views.routine_me_api, name="routine_me_api"),
    path("auth-context.js", views.auth_context_js, name="auth_context"),
    re_path(r"^(?P<path>.*)$", views.serve_site_file, name="site"),
]
