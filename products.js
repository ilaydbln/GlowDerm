const productDatabase = {

cleaners: [
  {brand:"La Roche Posay", name:"Effaclar Gel", type:"oily", target:"acne", img:"img/lrp-effaclar.png", desc:"Yağlı cilt"},
  {brand:"La Roche Posay", name:"Effaclar Duo Cleanser", type:"oily", target:"acne", img:"img/lrp-duo.png", desc:"Akne"},
  {brand:"La Roche Posay", name:"Hydrating Cleanser", type:"dry", target:"dryness", img:"img/lrp-hydra.png", desc:"Nem"},
  {brand:"Avene", name:"Cleanance Gel", type:"oily", target:"acne", img:"img/avene_cleanance.png", desc:"Akne"},
  {brand:"Avene", name:"Tolerance Cleanser", type:"sensitive", target:"redness", img:"img/avene_tol.png", desc:"Hassas"},
  {brand:"CeraVe", name:"Foaming Cleanser", type:"oily", target:"acne", img:"img/cerave_foam.png", desc:"Temizler"},
  {brand:"CeraVe", name:"Hydrating Cleanser", type:"dry", target:"dryness", img:"img/cerave_hydra.png", desc:"Seramid"},
  {brand:"Bepanthol", name:"Gentle Cleanser", type:"dry", target:"dryness", img:"img/bepanthol_cleanser.png", desc:"Nazik"},
  {brand:"Bepanthol", name:"Daily Wash", type:"dry", target:"dryness", img:"img/bepanthol_daily.png", desc:"Nemli"},
  {brand:"Caudalie", name:"Vinopure Cleanser", type:"oily", target:"acne", img:"img/caudalie_vinopure.png", desc:"Gözenek"},
  {brand:"Caudalie", name:"Foam Cleanser", type:"normal", target:"normal", img:"img/caudalie_foam.png", desc:"Nazik"},
  {brand:"Clinique", name:"Liquid Facial Soap", type:"sensitive", target:"redness", img:"img/clinique_clean.png", desc:"Nazik"}
],

toners: [
  {brand:"La Roche Posay", name:"Effaclar Toner", type:"oily", target:"acne", img:"img/t_eff.png", desc:"Denge"},
  {brand:"La Roche Posay", name:"Soothing Toner", type:"sensitive", target:"redness", img:"img/t_lrp_sooth.png", desc:"Yatıştırır"},
  {brand:"La Roche Posay", name:"Purifying Toner", type:"oily", target:"acne", img:"img/t_lrp_purify.png", desc:"Arındırır"},
  {brand:"Avene", name:"Cleanance Toner", type:"oily", target:"acne", img:"img/t_clean.png", desc:"Arındırır"},
  {brand:"Avene", name:"Soothing Toner", type:"sensitive", target:"redness", img:"img/t_avene.png", desc:"Yatıştırır"},
  {brand:"CeraVe", name:"Hydrating Toner", type:"dry", target:"dryness", img:"img/t_cera.png", desc:"Seramid"},
  {brand:"Clinique", name:"Clarifying Lotion Type 2", type:"normal", target:"normal", img:"img/clinique_t2.png", desc:"Kuru/Karma cilt arındırıcı"},
  {brand:"The Ordinary", name:"Glycolic Acid 7% Exfoliating Toner", type:"dry", target:"exfoliation", img:"img/t_glycolic.png", desc:"AHA peeling"},
{brand:"The Ordinary", name:"Saccharomyces Ferment 30% Milky Toner", type:"sensitive", target:"hydration", img:"img/t_milky.png", desc:"Nem & bariyer"},
  {brand:"Caudalie", name:"Vinopure Toner", type:"oily", target:"acne", img:"img/t_cauda.png", desc:"Sıkılaştırır"},
  {brand:"Caudalie", name:"Beauty Elixir", type:"normal", target:"normal", img:"img/t_beauty.png", desc:"Ferah"},
  {brand:"Caudalie", name:"Grape Water", type:"sensitive", target:"redness", img:"img/t_grape.png", desc:"Sakinleştirir"}
], 

serums: [
  {brand:"La Roche Posay", name:"Niacinamide Serum", type:"oily", target:"acne", img:"img/s_lr.png", desc:"Akne"},
  {brand:"La Roche Posay", name:"Retinol Serum", type:"normal", target:"aging", img:"img/s_ret.png", desc:"Anti-aging"},
  {brand:"Avene", name:"Hydrance Serum", type:"dry", target:"dryness", img:"img/s_avene.png", desc:"Nem"},
  {brand:"Avene", name:"Soothing Serum", type:"sensitive", target:"redness", img:"img/s_sooth.png", desc:"Yatıştırır"},
  {brand:"CeraVe", name:"Resurfacing Serum", type:"oily", target:"acne", img:"img/s_resurf.png", desc:"İz"},
  {brand:"CeraVe", name:"Hydrating Serum", type:"dry", target:"dryness", img:"img/s_cera_hyd.png", desc:"Nem"},
  {brand:"The Ordinary", name:"Niacinamide 10%", type:"oily", target:"acne", img:"img/s_ord_nia.png", desc:"Sebum"},
  {brand:"The Ordinary", name:"Hyaluronic Acid", type:"dry", target:"dryness", img:"img/s_ord_hya.png", desc:"Nem"},
  {brand:"The Ordinary", name:"Alpha Arbutin", type:"normal", target:"spot", img:"img/s_ord_alpha.png", desc:"Leke"},
  {brand:"Caudalie", name:"Vinoperfect Serum", type:"normal", target:"spot", img:"img/s_cauda.png", desc:"Leke"},
  {brand:"Caudalie", name:"Vinosource Serum", type:"dry", target:"dryness", img:"img/s_vino.png", desc:"Nem"}
], 

moisturizers: [
  {brand:"La Roche Posay", name:"Effaclar Duo", type:"oily", target:"acne", img:"img/m_eff.png", desc:"Akne"},
  {brand:"La Roche Posay", name:"Toleriane Cream", type:"sensitive", target:"redness", img:"img/m_tol.png", desc:"Hassas"},
  {brand:"La Roche Posay", name:"Hydraphase Cream", type:"dry", target:"dryness", img:"img/m_hydra.png", desc:"Nem"},
  {brand:"Avene", name:"Hydrance Cream", type:"dry", target:"dryness", img:"img/m_avene.png", desc:"Nem"},
  {brand:"Avene", name:"Cleanance Hydra", type:"oily", target:"acne", img:"img/m_clean.png", desc:"Akne"},
  {brand:"CeraVe", name:"Moisturizing Cream", type:"dry", target:"dryness", img:"img/m_cera.png", desc:"Seramid"},
  {brand:"CeraVe", name:"Lotion", type:"normal", target:"normal", img:"img/m_lotion.png", desc:"Hafif"},
  {brand:"Bepanthol", name:"Daily Cream", type:"dry", target:"dryness", img:"img/m_daily.png", desc:"Günlük"},
  {brand:"Bepanthol", name:"Repair Cream", type:"sensitive", target:"redness", img:"img/m_repair.png", desc:"Onarım"},
  {brand:"Clinique", name:"Moisture Surge", type:"dry", target:"dryness", img:"img/clinique_surge.png", desc:"Yoğun"},
  {brand:"Clinique", name:"Dramatically Different", type:"normal", target:"normal", img:"img/clinique_dd.png", desc:"Klasik"},
  {brand:"Caudalie", name:"Vinosource Cream", type:"dry", target:"dryness", img:"img/m_cauda.png", desc:"Nem"}
],
 
sunscreens: [
  {brand:"La Roche Posay", name:"Anthelios Fluid", type:"oily", target:"acne", img:"img/sp_lr.png", desc:"SPF"},
  {brand:"Avene", name:"SPF Fluid", type:"sensitive", target:"redness", img:"img/sp_avene.png", desc:"Hassas"},
  {brand:"CeraVe", name:"SPF Lotion", type:"dry", target:"dryness", img:"img/sp_cera.png", desc:"Nem"},
  {brand:"CeraVe", name:"Hydrating SPF", type:"dry", target:"dryness", img:"img/sp_cera_hyd.png", desc:"Koruma"},
  {brand:"Bepanthol", name:"Sensitive SPF", type:"sensitive", target:"redness", img:"img/sp_sens.png", desc:"Hassas"},
  {brand:"Bepanthol", name:"SPF Lotion", type:"dry", target:"dryness", img:"img/sp_bepa.png", desc:"Koruma"},
  {brand:"Caudalie", name:"Anti-Aging SPF", type:"normal", target:"spot", img:"img/sp_anti.png", desc:"Leke"},
  {brand:"Caudalie", name:"SPF Cream", type:"dry", target:"dryness", img:"img/sp_cauda.png", desc:"Nem"},

] 
};

/** Ürün detay / puan / yorum için localStorage (demo, veritabanı yok) */
const GLOWDERM_LS_RATINGS = "glowderm_ratings_v3";
const GLOWDERM_LS_REVIEWS = "glowderm_reviews_v3";

function getAllProductsFlat() {
  return Object.values(productDatabase).flat();
}

function getProductStorageId(p) {
  return encodeURIComponent(p.brand + "\x1e" + p.name);
}

function findProductByStorageId(storageId) {
  if (!storageId) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(storageId);
  } catch (e) {
    return null;
  }
  const sep = decoded.indexOf("\x1e");
  if (sep === -1) return null;
  const brand = decoded.slice(0, sep);
  const name = decoded.slice(sep + 1);
  const all = getAllProductsFlat();
  return all.find((x) => x.brand === brand && x.name === name) || null;
}

function readRatingsMap() {
  try {
    const raw = localStorage.getItem(GLOWDERM_LS_RATINGS);
    const m = raw ? JSON.parse(raw) : {};
    return m && typeof m === "object" ? m : {};
  } catch (e) {
    return {};
  }
}

function writeRatingsMap(m) {
  try {
    localStorage.setItem(GLOWDERM_LS_RATINGS, JSON.stringify(m));
  } catch (e) {
    /* yetersiz alan */
  }
}

function readReviewsMap() {
  try {
    const raw = localStorage.getItem(GLOWDERM_LS_REVIEWS);
    const m = raw ? JSON.parse(raw) : {};
    return m && typeof m === "object" ? m : {};
  } catch (e) {
    return {};
  }
}

function writeReviewsMap(m) {
  try {
    localStorage.setItem(GLOWDERM_LS_REVIEWS, JSON.stringify(m));
  } catch (e) {
    /* yetersiz alan */
  }
}

function computeDemoRatingsArray(pid) {
  let h = 5381;
  for (let i = 0; i < pid.length; i++) {
    h = ((h << 5) + h) ^ pid.charCodeAt(i);
    h |= 0;
  }
  h = Math.abs(h);
  const cnt = 4 + (h % 7);
  const arr = [];
  for (let i = 0; i < cnt; i++) {
    const x = Math.abs((((h + i * 7919) ^ (i * 503)) | 0) + i);
    let s = 3 + (x % 3);
    if ((x >> 4) % 11 === 0) s = 2;
    if ((x >> 2) % 19 === 0) s = 1;
    if (s < 1) s = 1;
    if (s > 5) s = 5;
    arr.push(s);
  }
  return arr;
}

function ensureDemoRatings(pid) {
  try {
    const m = readRatingsMap();
    if (!Array.isArray(m[pid]) || m[pid].length === 0) {
      m[pid] = computeDemoRatingsArray(pid);
      writeRatingsMap(m);
    }
  } catch (e) {
    /* kotası dolu / gizli mod vb. */
  }
}

function getAverageRatingStats(pid) {
  try {
    ensureDemoRatings(pid);
    let arr = readRatingsMap()[pid];
    if (!Array.isArray(arr) || arr.length === 0) {
      arr = computeDemoRatingsArray(pid);
    }
    const sum = arr.reduce((a, b) => a + Number(b), 0);
    const avg = Math.round((sum / arr.length) * 10) / 10;
    return { avg, count: arr.length };
  } catch (e) {
    return { avg: 4, count: 1 };
  }
}

function addProductRating(pid, stars) {
  const n = Math.min(5, Math.max(1, Number(stars)));
  const m = readRatingsMap();
  if (!Array.isArray(m[pid])) m[pid] = [];
  m[pid].push(n);
  writeRatingsMap(m);
}

function ensureDemoReviews(pid) {
  const m = readReviewsMap();
  if (!Array.isArray(m[pid]) || m[pid].length === 0) {
    let H = 5381;
    for (let i = 0; i < pid.length; i++) {
      H = ((H << 5) + H) ^ pid.charCodeAt(i);
      H |= 0;
    } 
    H = Math.abs(H);
   const authors = "Şule Y.|İlayda B.|Ata B.|Ahmet G.|Elif S.|Yağmur E.|Ceren K.|Dilara K.|Tülay S.|Tolga S.|Yusuf S.|Büşra H.|Duru A.|Zehra Ö.|.|Beril B.|Emre A.|Alp B.|Masal M.|Sude D.|Belis A.".split("|");

const texts = "Bu ürünü çok sevdim, cildimle harika anlaşıyor.|Nemlendirmesi yeterli, yapısı hafif.|Sivilce problemime iyi geldi, tekrar alırım.|Sabahları tazelenmiş hissediyorum.|Makyaj altında güzel duruyor, topaklanma yapmıyor.|Çabuk emiliyor, yapışkanlık yok.|Hassas cildimde kızarıklık yapmadı.|Düzenli kullanımda cildim daha yumuşak oldu.|Kışın ekstra nem isteyenler için ideal bir ürün.|Yağlı bölgemde parlama artışı yaşamadım.|Göz çevresine dikkat ederek kullanıyorum, iyi gidiyor.|Karma cildimde dengeyi koruduğunu düşünüyorum.|Serum sonrası kilitleyici olarak kullanıyorum, etkisi güzel.|İlk hafta hafif peeling hissi oldu ama sonra düzeldi.|Ambalajı pratik, seyahatlerde de taşıdım.|Cilt bariyerim zayıftı ama bu ürün tahriş etmedi.|Ton eşitsizliğinde küçük bir iyileşme gördüm.|Akşam yıkadıktan sonra nemli his uzun süre devam ediyor.|Komedojenik etkisi görmedim (benim cildimde).|Koku hassasiyetim var ama bu ürün tolere edilebilir geldi.|Eşim de kullandı ve ikimiz de memnun kaldık.|SPF sonrası topaklanma yapan ürünlerden sonra ferah bir alternatif oldu.|Sivilce izlerinde yumuşama bekliyorum, erken ama umut verici.|Günlük doz yeterli, aşırı kullanımda ağırlaşmadı.|Dermatoloğa göstermeden önce küçük bir bölgede denedim ve sorun çıkmadı.".split("|");

    const n = 2 + (H % 3);
    const usedA = {};
    const usedT = {};
    const list = []; 
    for (let i = 0; i < n; i++) { 
      let ai = Math.abs(((H + i * 131) ^ (i * 977)) | 0) % authors.length;
      let ti = Math.abs(((H + i * 257) ^ (i * 401)) | 0) % texts.length;
      let g = 0;
      while (usedA[ai] && g++ < 40) ai = (ai + 1) % authors.length;
      g = 0;
      while (usedT[ti] && g++ < 40) ti = (ti + 3) % texts.length;
      usedA[ai] = 1;
      usedT[ti] = 1;
      const sx = Math.abs(((H + i * 89) ^ (i * 12345)) | 0);
      let stars = 3 + (sx % 3);
      if ((sx >> 5) % 9 === 0) stars = 2;
      if (stars < 1) stars = 1;
      if (stars > 5) stars = 5;
      const dayOff = 1 + (Math.abs(((H + i * 37) ^ 999) | 0) % 24);
      list.push({
        author: authors[ai],
        text: texts[ti],
        stars: stars,
        at: Date.now() - 86400000 * dayOff,
      });
    }
    m[pid] = list;
    try {
      writeReviewsMap(m);
    } catch (e) {
      /* yetersiz alan */
    }
  }
}

function getReviewsForProduct(pid) {
  ensureDemoReviews(pid);
  const arr = readReviewsMap()[pid];
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  return arr.slice().sort((a, b) => b.at - a.at);
}

function addProductReview(pid, author, text, stars) {
  const m = readReviewsMap();
  if (!Array.isArray(m[pid])) m[pid] = [];
  m[pid].push({
    author: (author && String(author).trim()) || "Misafir",
    text: String(text || "").trim(),
    stars: Math.min(5, Math.max(1, Number(stars))),
    at: Date.now(),
  });
  writeReviewsMap(m);
}

function glowdermEscapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatStarsVisual(avg) {
  const rounded = Math.round(Math.max(0, Math.min(5, Number(avg) || 0)));
  let s = "";
  for (let i = 1; i <= 5; i++) {
    s += i <= rounded ? "★" : "☆";
  }
  return s;
}
