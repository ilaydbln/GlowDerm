/**
 * Giriş gerektiren işlemler, navbar ve modal uyarıları.
 * Önce /auth-context.js yüklenmelidir (Django runserver gerekir).
 */
(function () {
  function auth() {
    return window.GLOWDERM_AUTH || { loggedIn: false };
  }

  function ensureModalStyles() {
    if (document.querySelector('link[href="/auth-modal.css"]')) {
      return;
    }
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "/auth-modal.css";
    document.head.appendChild(l);
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function hasDjangoBackend() {
    return !!(auth().csrfToken && auth().loginApi && auth().registerApi);
  }

  function clearRoutineState() {
    try {
      localStorage.removeItem("glowderm_answers");
      localStorage.removeItem("glowderm_quiz_completed_v1");
      localStorage.removeItem("glowderm_routine_cache_v1");
    } catch (e) {}
  }

  window.glowdermClearRoutineState = clearRoutineState;

  function switchAuthTab(root, tab) {
    var loginForm = root.querySelector("#glowderm-login-form");
    var regForm = root.querySelector("#glowderm-register-form");
    root.querySelectorAll("[data-auth-tab]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-auth-tab") === tab);
    });
    if (loginForm) loginForm.style.display = tab === "login" ? "block" : "none";
    if (regForm) regForm.style.display = tab === "register" ? "block" : "none";
  }

  function submitAuthForm(form, apiUrl, nextPath, errorEl) {
    errorEl.textContent = "";
    var fd = new FormData(form);
    fd.append("next", nextPath);
    fetch(apiUrl, {
      method: "POST",
      body: fd,
      credentials: "same-origin",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data.ok) {
          clearRoutineState();
          window.location.href = result.data.redirect || nextPath || "/index.html";
          return;
        }
        var errs = (result.data && result.data.errors) || ["İşlem başarısız. Tekrar deneyin."];
        errorEl.textContent = errs.join(" ");
      })
      .catch(function () {
        errorEl.textContent =
          "Sunucuya bağlanılamadı. python manage.py runserver → http://127.0.0.1:8000";
      });
  }

  function glowdermShowAuthModal(opts) {
    ensureModalStyles();
    opts = opts || {};
    var primaryText = opts.primaryText || "Lütfen giriş yapın.";
    var title = opts.title || "";
    var message =
      opts.message || "Hesabınız yoksa kayıt olun; varsa giriş yapın.";
    var nextPath = opts.nextPath || window.location.pathname + window.location.search;
    var onClose = opts.onClose || null;
    var startTab = opts.tab === "register" ? "register" : "login";
    var csrf = auth().csrfToken || "";

    var existing = document.getElementById("glowderm-auth-modal-root");
    if (existing) existing.remove();

    var root = document.createElement("div");
    root.id = "glowderm-auth-modal-root";
    root.className = "glowderm-auth-modal-root";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "glowderm-auth-modal-primary");

    var formsBlock;
    if (hasDjangoBackend()) {
      formsBlock =
        '<div class="glowderm-auth-tabs">' +
        '<button type="button" class="glowderm-auth-tab is-active" data-auth-tab="login">Giriş Yap</button>' +
        '<button type="button" class="glowderm-auth-tab" data-auth-tab="register">Kayıt Ol</button>' +
        "</div>" +
        '<p class="glowderm-auth-form-error" id="glowderm-auth-error" role="alert"></p>' +
        '<form id="glowderm-login-form" class="glowderm-auth-form">' +
        '<input type="hidden" name="csrfmiddlewaretoken" value="' + escapeHtml(csrf) + '">' +
        '<label>Kullanıcı adı</label><input class="glowderm-auth-field" type="text" name="username" required autocomplete="username">' +
        '<label>Şifre</label><input class="glowderm-auth-field" type="password" name="password" required autocomplete="current-password">' +
        '<button type="submit" class="glowderm-auth-modal-btn glowderm-auth-modal-btn-primary">Giriş Yap</button></form>' +
        '<form id="glowderm-register-form" class="glowderm-auth-form" style="display:none">' +
        '<input type="hidden" name="csrfmiddlewaretoken" value="' + escapeHtml(csrf) + '">' +
        '<label>Kullanıcı adı</label><input class="glowderm-auth-field" type="text" name="username" required autocomplete="username">' +
        '<label>Şifre</label><input class="glowderm-auth-field" type="password" name="password1" required autocomplete="new-password">' +
        '<label>Şifre (tekrar)</label><input class="glowderm-auth-field" type="password" name="password2" required autocomplete="new-password">' +
        '<button type="submit" class="glowderm-auth-modal-btn glowderm-auth-modal-btn-primary">Kayıt Ol</button></form>';
    } else {
      formsBlock =
        '<p class="glowderm-auth-server-hint">Giriş için siteyi <strong>Django</strong> ile açın (Live Server çalışmaz):<br>' +
        '<code>python manage.py runserver</code><br>' +
        '<a href="http://127.0.0.1:8000/index.html">http://127.0.0.1:8000</a></p>';
    }

    root.innerHTML =
      '<div class="glowderm-auth-modal-backdrop" data-glowderm-modal-backdrop></div>' +
      '<div class="glowderm-auth-modal-panel">' +
      '<div class="glowderm-auth-modal-brand">GlowDerm</div>' +
      '<p id="glowderm-auth-modal-primary" class="glowderm-auth-modal-lead">' + escapeHtml(primaryText) + "</p>" +
      (title ? '<h2 class="glowderm-auth-modal-title">' + escapeHtml(title) + "</h2>" : "") +
      '<p class="glowderm-auth-modal-message">' + escapeHtml(message) + "</p>" +
      formsBlock +
      '<button type="button" class="glowderm-auth-modal-close" data-glowderm-modal-close>Kapat</button>' +
      "</div>";

    document.body.appendChild(root);
    document.body.classList.add("glowderm-modal-open");

    function close() {
      root.remove();
      document.body.classList.remove("glowderm-modal-open");
      if (typeof onClose === "function") onClose();
    }

    root.querySelector("[data-glowderm-modal-backdrop]").addEventListener("click", close);
    root.querySelector("[data-glowderm-modal-close]").addEventListener("click", close);

    if (hasDjangoBackend()) {
      switchAuthTab(root, startTab);
      root.querySelectorAll("[data-auth-tab]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          switchAuthTab(root, btn.getAttribute("data-auth-tab"));
        });
      });
      var errorEl = root.querySelector("#glowderm-auth-error");
      root.querySelector("#glowderm-login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        submitAuthForm(e.target, auth().loginApi, nextPath, errorEl);
      });
      root.querySelector("#glowderm-register-form").addEventListener("submit", function (e) {
        e.preventDefault();
        submitAuthForm(e.target, auth().registerApi, nextPath, errorEl);
      });
    }

    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", esc);
      }
    });
  }

  window.glowdermShowAuthModal = glowdermShowAuthModal;

  function requireLogin(message, nextPath) {
    if (auth().loggedIn) return true;
    glowdermShowAuthModal({
      primaryText: "Lütfen giriş yapın.",
      message: message || "Bu işlemi yapabilmek için hesabınıza giriş yapmanız gerekiyor.",
      nextPath: nextPath || window.location.pathname + window.location.search,
    });
    return false;
  }

  window.glowdermRequireLogin = requireLogin;

  var PROTECTED_META = {
    "quiz.html": {
      title: "Quiz",
      message: "Quiz yapmak için lütfen giriş yapın.",
    },
    "favoriler.html": {
      title: "Favoriler",
      message: "Favorilerinizi görmek için lütfen giriş yapın.",
    },
    "rutin.html": {
      title: "Rutin",
      message: "Rutininizi görmek için lütfen giriş yapın.",
    },
  };

  function protectedFileFromHref(href) {
    if (!href) return null;
    var h = href.split("?")[0].split("#")[0];
    for (var key in PROTECTED_META) {
      if (h === key || h.endsWith("/" + key)) return key;
    }
    return null;
  }

  function currentProtectedPage() {
    var seg = (window.location.pathname || "").split("/").filter(Boolean);
    var last = seg.length ? seg[seg.length - 1] : "";
    return PROTECTED_META[last] ? last : null;
  }

  function enhanceNavbar() {
    var menu = document.querySelector(".navbar .menu");
    if (!menu || menu.querySelector(".auth-nav-item") || !auth().loggedIn) return;
    var li = document.createElement("li");
    li.className = "auth-nav-item";
    li.innerHTML =
      '<span class="auth-user">' + (auth().username || "Hesap") + '</span> ' +
      '<a data-glowderm-logout href="' + (auth().logoutUrl || "/accounts/cikis/") + '">Çıkış</a>';
    menu.appendChild(li);
  }

  function wireLogoutCleanup() {
    document.querySelectorAll('a[href*="/accounts/cikis/"], [data-glowderm-logout]').forEach(function (a) {
      a.addEventListener("click", clearRoutineState, true);
    });
  }

  function guardProtectedLinks() {
    document.querySelectorAll(".menu a, .hero a, a.btn, .lock-btn").forEach(function (a) {
      var key = protectedFileFromHref(a.getAttribute("href") || "");
      if (!key || auth().loggedIn) return;
      var meta = PROTECTED_META[key];
      a.addEventListener("click", function (e) {
        e.preventDefault();
        glowdermShowAuthModal({
          title: meta.title,
          message: meta.message,
          nextPath: "/" + key,
        });
      }, true);
    });
  }

  function wireHeroAuthButtons() {
    var regBtn = document.querySelector("[data-glowderm-open-register]");
    var loginBtn = document.querySelector("[data-glowderm-open-login]");
    if (regBtn) {
      regBtn.addEventListener("click", function (e) {
        e.preventDefault();
        glowdermShowAuthModal({ tab: "register", nextPath: "/index.html" });
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        glowdermShowAuthModal({ tab: "login", nextPath: "/index.html" });
      });
    }
  }

  function initIndexHero() {
    var guest = document.getElementById("hero-guest");
    var member = document.getElementById("hero-member");
    if (!guest && !member) return;
    if (auth().loggedIn) {
      if (guest) guest.style.display = "none";
      if (member) member.style.display = "block";
    } else {
      if (guest) guest.style.display = "block";
      if (member) member.style.display = "none";
    }
  }

  function gateProtectedDocument() {
    var key = currentProtectedPage();
    if (!key || auth().loggedIn) return;
    var meta = PROTECTED_META[key];
    glowdermShowAuthModal({
      title: meta.title,
      message: meta.message,
      nextPath: "/" + key,
      onClose: function () {
        window.location.href = "/index.html";
      },
    });
  }

  function init() {
    enhanceNavbar();
    wireLogoutCleanup();
    guardProtectedLinks();
    wireHeroAuthButtons();
    initIndexHero();
    gateProtectedDocument();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
