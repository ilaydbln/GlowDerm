(function () {
  const TYPE_TR = {
    oily: "Yağlı / karma eğilimli",
    dry: "Kuru",
    sensitive: "Hassas",
    normal: "Normal",
  };
  const TARGET_TR = {
    acne: "Akne ve gözenek",
    dryness: "Nemlendirme",
    redness: "Kızarıklık / yatıştırma",
    aging: "Anti-aging",
    normal: "Genel denge",
    spot: "Leke görünümü",
    exfoliation: "Peeling / yenilenme",
    hydration: "Nem & bariyer",
  };

  function typeLabel(t) {
    return TYPE_TR[t] || t;
  }
  function targetLabel(t) {
    return TARGET_TR[t] || t;
  }

  function buildLongDescription(p) {
    return (
      `${glowdermEscapeHtml(p.name)}, ${glowdermEscapeHtml(p.brand)} markasına ait bir cilt bakım ürünüdür. ` +
      `Ürün etiketi: “${glowdermEscapeHtml(p.desc)}”. ` +
      `Demo kataloğumuzda cilt tipi <strong>${glowdermEscapeHtml(typeLabel(p.type))}</strong> ve odak alanı <strong>${glowdermEscapeHtml(targetLabel(p.target))}</strong> olarak sınıflandırılmıştır. ` +
      `Temiz cilde, gündüz veya akşam rutininize uygun şekilde uygulayınız; göz çevresinden kaçırınız.`
    );
  }

  function renderInteractiveStars(pid, onPick) {
    const wrap = document.createElement("div");
    wrap.style.cssText =
      "margin-top:12px;font-size:26px;letter-spacing:6px;color:#d4af37;cursor:pointer;user-select:none;";
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement("span");
      s.textContent = "☆";
      s.dataset.value = String(i);
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", i + " yıldız");
      s.addEventListener("click", function () {
        onPick(i);
        Array.from(wrap.children).forEach(function (ch, idx) {
          ch.textContent = idx < i ? "★" : "☆";
        });
      });
      wrap.appendChild(s);
    }
    return wrap;
  }

  function renderReviewsList(pid) {
    const list = getReviewsForProduct(pid);
    const box = document.createElement("div");
    box.style.cssText = "display:flex;flex-direction:column;gap:16px;";
    if (!list.length) {
      const empty = document.createElement("p");
      empty.style.cssText = "margin:0;color:rgba(0,0,0,0.55);font-size:14px;";
      empty.textContent = "Henüz yorum yok; ilk yorumu siz yazın.";
      box.appendChild(empty);
      return box;
    }
    list.forEach(function (r) {
      const row = document.createElement("article");
      row.style.cssText =
        "border-bottom:1px solid rgba(0,0,0,0.08);padding-bottom:16px;";
      row.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;">' +
        "<strong style=\"font-size:14px;color:#111;\">" +
        glowdermEscapeHtml(r.author) +
        "</strong>" +
        '<span style="font-size:12px;color:rgba(0,0,0,0.45);">' +
        new Date(r.at).toLocaleDateString("tr-TR") +
        "</span></div>" +
        '<div style="margin-top:6px;font-size:13px;color:#b38b2d;letter-spacing:3px;">' +
        formatStarsVisual(r.stars) +
        "</div>" +
        '<p style="margin:10px 0 0;font-size:14px;line-height:1.55;color:#222;">' +
        glowdermEscapeHtml(r.text) +
        "</p>";
      box.appendChild(row);
    });
    return box;
  }

  function mount(pid, product) {
    const root = document.getElementById("product-detail-root");
    if (!root) return;

    function refreshStatsEl(el) {
      const st = getAverageRatingStats(pid);
      el.innerHTML =
        '<span style="font-size:15px;color:#b38b2d;letter-spacing:4px;">' +
        formatStarsVisual(st.avg) +
        "</span>" +
        '<span style="margin-left:10px;font-size:14px;color:rgba(0,0,0,0.65);">' +
        st.avg +
        " / 5 · " +
        st.count +
        " değerlendirme</span>";
    }

    root.innerHTML = "";

    const shell = document.createElement("div");
    shell.style.cssText =
      "max-width:1180px;margin:0 auto;padding:100px 60px 60px;box-sizing:border-box;";

    const back = document.createElement("a");
    back.href = "products.html";
    back.className = "btn";
    back.textContent = "Ürünlere dön";
    back.style.cssText =
      "position:relative;z-index:12;display:inline-block;cursor:pointer;";
    shell.appendChild(back);

    const bc = document.createElement("div");
    bc.style.cssText =
      "margin:18px 0 22px;font-size:12px;color:rgba(0,0,0,0.55);letter-spacing:0.3px;";
    bc.innerHTML =
      '<a href="index.html" style="color:inherit;text-decoration:none;">Ana Sayfa</a>' +
      ' <span style="opacity:0.5;">/</span> ' +
      '<a href="products.html" style="color:inherit;text-decoration:none;">Ürünler</a>' +
      ' <span style="opacity:0.5;">/</span> ' +
      "<span>" +
      glowdermEscapeHtml(product.brand) +
      "</span>" +
      ' <span style="opacity:0.5;">/</span> ' +
      "<span>" +
      glowdermEscapeHtml(product.name) +
      "</span>";
    shell.appendChild(bc);

    const grid = document.createElement("div");
    grid.style.cssText =
      "display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:40px;align-items:start;";

    const left = document.createElement("div");
    left.style.cssText =
      "background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:28px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.05);";
    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;
    img.style.cssText =
      "width:100%;max-width:360px;max-height:420px;object-fit:contain;";
    left.appendChild(img);

    const right = document.createElement("div");
    right.style.cssText =
      "background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:28px 32px;box-shadow:0 10px 25px rgba(0,0,0,0.05);";

    const brandEl = document.createElement("div");
    brandEl.style.cssText =
      "font-size:13px;color:#b38b2d;letter-spacing:2px;text-transform:uppercase;font-weight:600;";
    brandEl.textContent = product.brand;

    const title = document.createElement("h1");
    title.style.cssText =
      "margin:10px 0 6px;font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;font-weight:500;color:#111;line-height:1.15;";
    title.textContent = product.name;

    const statsRow = document.createElement("div");
    statsRow.style.cssText = "margin-top:8px;display:flex;align-items:center;flex-wrap:wrap;gap:6px;";
    refreshStatsEl(statsRow);

    const rateTitle = document.createElement("div");
    rateTitle.style.cssText =
      "margin-top:22px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(0,0,0,0.55);font-weight:600;";
    rateTitle.textContent = "Puan ver (1–5 yıldız)";

    const rateNote = document.createElement("div");
    rateNote.id = "rate-note";
    rateNote.style.cssText =
      "margin-top:8px;font-size:13px;color:rgba(0,0,0,0.55);min-height:1.2em;";

    const stars = renderInteractiveStars(pid, function (n) {
      if (
        window.glowdermRequireLogin &&
        !window.glowdermRequireLogin("Puan vermek için giriş yapın.", window.location.pathname)
      ) {
        return;
      }
      addProductRating(pid, n);
      refreshStatsEl(statsRow);
      rateNote.textContent = "Teşekkürler, " + n + " yıldız kaydedildi.";
    });

    const about = document.createElement("div");
    about.style.cssText = "margin-top:26px;";
    about.innerHTML =
      '<h2 style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(0,0,0,0.55);margin:0 0 10px;font-weight:600;">Ürün hakkında</h2>' +
      '<p style="margin:0;font-size:15px;line-height:1.7;color:#222;">' +
      buildLongDescription(product) +
      "</p>";

    const facts = document.createElement("div");
    facts.style.cssText = "margin-top:22px;display:grid;gap:10px;";
    facts.innerHTML =
      '<div style="font-size:14px;color:#222;"><strong style="color:#111;">Cilt tipi:</strong> ' +
      glowdermEscapeHtml(typeLabel(product.type)) +
      "</div>" +
      '<div style="font-size:14px;color:#222;"><strong style="color:#111;">Odak:</strong> ' +
      glowdermEscapeHtml(targetLabel(product.target)) +
      "</div>" +
      '<div style="font-size:14px;color:#222;"><strong style="color:#111;">Kullanım:</strong> ' +
      "Avucunuza aldığınız miktarda ürünü yüzünüze ve boynunuza yayınız; ardından nemlendirici ile devam edin." +
      "</div>";

    right.appendChild(brandEl);
    right.appendChild(title);
    right.appendChild(statsRow);
    right.appendChild(rateTitle);
    right.appendChild(stars);
    right.appendChild(rateNote);
    right.appendChild(about);
    right.appendChild(facts);

    grid.appendChild(left);
    grid.appendChild(right);
    shell.appendChild(grid);

    const reviewsSection = document.createElement("section");
    reviewsSection.style.cssText =
      "margin-top:36px;background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:28px 32px 36px;box-shadow:0 10px 25px rgba(0,0,0,0.05);";

    const rh = document.createElement("h2");
    rh.style.cssText =
      "margin:0 0 6px;font-size:18px;font-weight:600;color:#111;letter-spacing:0.3px;";
    rh.textContent = "Yorumlar";

    const rsub = document.createElement("p");
    rsub.style.cssText = "margin:0 0 22px;font-size:13px;color:rgba(0,0,0,0.55);";
    rsub.textContent =
      "Diğer kullanıcıların deneyimlerini görün; yorum yazmak için giriş yapmanız gerekir.";

    const reviewsHost = document.createElement("div");
    reviewsHost.id = "reviews-list-host";

    const formWrap = document.createElement("div");
    formWrap.style.cssText =
      "margin-top:28px;padding-top:22px;border-top:1px solid rgba(0,0,0,0.08);";
    formWrap.innerHTML =
      '<h3 style="margin:0 0 14px;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:rgba(0,0,0,0.55);font-weight:600;">Yorum yaz</h3>' +
      '<label style="display:block;font-size:12px;color:rgba(0,0,0,0.55);margin-bottom:6px;">İsim (isteğe bağlı)</label>' +
      '<input id="rv-author" type="text" maxlength="60" style="width:100%;max-width:320px;padding:10px 12px;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:14px;box-sizing:border-box;margin-bottom:14px;">' +
      '<label style="display:block;font-size:12px;color:rgba(0,0,0,0.55);margin-bottom:6px;">Yorumunuz</label>' +
      '<textarea id="rv-text" rows="4" style="width:100%;padding:12px;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:14px;resize:vertical;box-sizing:border-box;"></textarea>' +
      '<div style="margin-top:12px;display:flex;flex-wrap:wrap;align-items:center;gap:12px;">' +
      '<span style="font-size:12px;color:rgba(0,0,0,0.55);">Yıldız:</span>' +
      '<select id="rv-stars" style="padding:8px 10px;border-radius:8px;border:1px solid rgba(0,0,0,0.12);font-size:14px;">' +
      "<option value=\"5\">5</option><option value=\"4\">4</option><option value=\"3\">3</option><option value=\"2\">2</option><option value=\"1\">1</option>" +
      "</select>" +
      '<button type="button" id="rv-submit" style="padding:10px 20px;border-radius:50px;border:none;background:linear-gradient(135deg,#d4af37,#f5e6a8);color:#111;font-weight:600;font-size:12px;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 20px rgba(212,175,55,0.25);">Gönder</button>' +
      "</div>" +
      '<p id="rv-msg" style="margin:12px 0 0;font-size:13px;color:rgba(0,0,0,0.55);min-height:1.2em;"></p>';

    reviewsSection.appendChild(rh);
    reviewsSection.appendChild(rsub);
    reviewsSection.appendChild(reviewsHost);
    reviewsSection.appendChild(formWrap);
    shell.appendChild(reviewsSection);

    root.appendChild(shell);

    function redrawReviews() {
      reviewsHost.innerHTML = "";
      reviewsHost.appendChild(renderReviewsList(pid));
    }
    redrawReviews();

    const auth = window.GLOWDERM_AUTH || { loggedIn: false };
    if (!auth.loggedIn) {
      formWrap.innerHTML =
        '<p style="margin:0;font-size:14px;color:rgba(0,0,0,0.65);">' +
        'Yorum yazmak için ' +
        '<button type="button" class="glowderm-inline-auth-link" data-glowderm-open-login>giriş yapın</button> veya ' +
        '<button type="button" class="glowderm-inline-auth-link" data-glowderm-open-register>kayıt olun</button>.</p>';
      formWrap.querySelector("[data-glowderm-open-login]").addEventListener("click", function () {
        if (window.glowdermShowAuthModal) {
          window.glowdermShowAuthModal({
            tab: "login",
            nextPath: window.location.pathname + window.location.search,
          });
        }
      });
      formWrap.querySelector("[data-glowderm-open-register]").addEventListener("click", function () {
        if (window.glowdermShowAuthModal) {
          window.glowdermShowAuthModal({
            tab: "register",
            nextPath: window.location.pathname + window.location.search,
          });
        }
      });
    }

    const submitBtn = document.getElementById("rv-submit");
    if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      if (
        window.glowdermRequireLogin &&
        !window.glowdermRequireLogin("Yorum yazmak için giriş yapın.", window.location.pathname + window.location.search)
      ) {
        return;
      }
      const msg = document.getElementById("rv-msg");
      const ta = document.getElementById("rv-text");
      const au = document.getElementById("rv-author");
      const st = document.getElementById("rv-stars");
      const text = (ta && ta.value) || "";
      if (!text.trim()) {
        msg.textContent = "Lütfen yorum metnini yazın.";
        msg.style.color = "#b00020";
        return;
      }
      addProductReview(pid, au ? au.value : "", text, st ? st.value : 5);
      msg.textContent = "Yorumunuz kaydedildi.";
      msg.style.color = "rgba(0,0,0,0.55)";
      ta.value = "";
      if (au) au.value = "";
      redrawReviews();
    });
    }

    if (!auth.loggedIn) {
      rateTitle.textContent = "Puan ver (giriş gerekli)";
      rateNote.textContent = "Puan vermek için giriş yapın.";
      stars.style.opacity = "0.45";
      stars.style.pointerEvents = "none";
    }
  }

  function run() {
    const params = new URLSearchParams(window.location.search);
    const root = document.getElementById("product-detail-root");
    if (!root) return;

    const allFlat = getAllProductsFlat();
    let product = null;
    let pid = null;

    const iRaw = params.get("i");
    if (iRaw != null && String(iRaw).trim() !== "") {
      const idx = parseInt(String(iRaw).trim(), 10);
      if (!Number.isNaN(idx) && idx >= 0 && idx < allFlat.length) {
        product = allFlat[idx];
        pid = getProductStorageId(product);
      }
    }

    if (!product) {
      const id = params.get("id");
      if (id) {
        product = findProductByStorageId(id);
        if (product) pid = getProductStorageId(product);
      }
    }

    if (!product || !pid) {
      root.innerHTML =
        '<div style="position:relative;z-index:11;max-width:720px;margin:0 auto;padding:100px 60px 80px;box-sizing:border-box;">' +
        '<a class="btn" href="products.html" style="position:relative;z-index:12;display:inline-block;cursor:pointer;">Ürünlere dön</a>' +
        '<p style="margin-top:24px;font-size:16px;color:#111;">Ürün bulunamadı veya bağlantı hatalı.</p></div>';
      document.title = "Ürün bulunamadı";
      return;
    }

    document.title = product.name + " · GlowDerm";
    mount(pid, product);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
