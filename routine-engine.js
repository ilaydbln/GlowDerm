(function () {
  const concernTargetMap = {
    acne: ["acne"],
    pigmentation: ["spot"],
    texture: ["exfoliation"],
    aging: ["aging"],
    redness: ["redness"],
    dry: ["dryness"],
  };

  const labels = ["TEMIZLEYICI", "TONIK", "SERUM", "NEMLENDIRICI", "SPF"];

  function buildUserProfile(answers) {
    const answerMap = new Map(answers.map((a) => [a.category, a.value]));
    return {
      skinType: answerMap.get("skin-type"),
      concern: answerMap.get("concern-primary"),
      barrier: answerMap.get("skin-barrier"),
      texture: answerMap.get("skin-texture"),
      lifestyle: answerMap.get("lifestyle"),
      sun: answerMap.get("sun-exposure"),
      afterWash: answerMap.get("after-wash"),
      acneZone: answerMap.get("acne-zone"),
      makeup: answerMap.get("makeup"),
      season: answerMap.get("season"),
      blackheads: answerMap.get("blackheads"),
    };
  }

  function buildRoutine(answers, products) {
    if (!Array.isArray(answers) || answers.length === 0 || !products) {
      return [];
    }

    const user = buildUserProfile(answers);

    function scoreProduct(product) {
      let score = 0;

      if (product.type === user.skinType) score += 10;
      if (product.type === user.texture) score += 4;
      if (user.barrier === "sensitive" && product.type === "sensitive") score += 6;
      if (user.afterWash === product.type) score += 4;

      const targets = concernTargetMap[user.concern] || [user.concern];
      if (targets.includes(product.target)) score += 12;
      if (user.blackheads === "acne" && product.target === "acne") score += 5;
      if (user.acneZone === "acne" && product.target === "acne") score += 3;
      if (user.sun === "high-uv" && product.category === "sunscreens") score += 5;

      return score;
    }

    function pickBestProduct(list) {
      if (!Array.isArray(list) || list.length === 0) return null;
      return [...list].sort((a, b) => {
        const diff = scoreProduct(b) - scoreProduct(a);
        if (diff !== 0) return diff;
        return a.name.localeCompare(b.name, "tr");
      })[0];
    }

    return [
      pickBestProduct(products.cleaners),
      pickBestProduct(products.toners),
      pickBestProduct(products.serums),
      pickBestProduct(products.moisturizers),
      pickBestProduct(products.sunscreens),
    ].filter(Boolean);
  }

  window.GlowDermRoutine = {
    labels,
    buildRoutine,
  };
})();
