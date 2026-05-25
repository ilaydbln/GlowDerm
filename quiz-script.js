const questions = [
    {
        id: 1,
        category: "skin-type",
        question: "Cildini yıkadıktan 2-3 saat sonra cildin nasıl gözüküyor?",
        options: [
            { text: "Tüm yüzüm yağlanır.", value: "oily" },
            { text: "T bölgesi yağlı.", value: "combination" },
            { text: "Gergin ve kuru.", value: "dry" },
            { text: "Dengeli.", value: "normal" }
        ]
    },
    {
        id: 2,
        category: "skin-barrier",
        question: "Cildin dış etkenlere nasıl tepki verir?",
        options: [
            { text: "Çok hassas.", value: "sensitive" },
            { text: "Bazen hassas.", value: "semi-sensitive" },
            { text: "Dayanıklı.", value: "resistant" }
        ]
    },
    {
        id: 3,
        category: "concern-primary",
        question: "Cildindeki en büyük problemin nedir?",
        options: [
            { text: "Akne", value: "acne" },
            { text: "Leke", value: "pigmentation" },
            { text: "Doku", value: "texture" },
            { text: "Yaşlanma", value: "aging" }
        ]
    },
    {
        id: 4,
        category: "skin-texture",
        question: "Cilt yüzeyin nasıl?",
        options: [
            { text: "Yağlı", value: "oily" },
            { text: "Kuru", value: "dry" },
            { text: "Pürüzlü", value: "uneven" },
            { text: "Düzgün", value: "normal" }
        ]
    },
    {
        id: 5,
        category: "lifestyle",
        question: "Yaşam tarzın?",
        options: [
            { text: "Stresli", value: "stress" },
            { text: "Orta", value: "balanced" },
            { text: "Rahat", value: "healthy" }
        ]
    },
    {
        id: 6,
        category: "sun-exposure",
        question: "Güneş maruziyet seviyen nedir?",
        options: [
            { text: "Yüksek", value: "high-uv" },
            { text: "Orta", value: "medium-uv" },
            { text: "Düşük", value: "low-uv" }
        ]
    },

    // 🔥 EKSTRA 5 SORU
    {
        id: 7,
        category: "after-wash",
        question: "Yüzünü yıkadıktan sonra yüzün nasıl gözüküyor?",
        options: [
            { text: "Kuru", value: "dry" },
            { text: "Normal", value: "normal" },
            { text: "Yağlı", value: "oily" }
        ]
    },
    {
        id: 8,
        category: "acne-zone",
        question: "Sivilce bölgesi?",
        options: [
            { text: "T bölgesi", value: "oily" },
            { text: "Her yer", value: "acne" },
            { text: "Yok", value: "normal" }
        ]
    },
    {
        id: 9,
        category: "makeup",
        question: "Makyaj yaptıktan sonra  makyaj cildinde nasıl duruyor?",
        options: [
            { text: "Akar", value: "oily" },
            { text: "Kurur", value: "dry" },
            { text: "İyi", value: "normal" }
        ]
    },
    {
        id: 10,
        category: "season",
        question: "Mevsim geçişlerinde cildin nasıl tepki verir?",
        options: [
            { text: "Kızarır", value: "redness" },
            { text: "Kurur", value: "dry" },
            { text: "Değişmez", value: "normal" }
        ]
    },
    {
        id: 11,
        category: "blackheads",
        question: "Yüzündeki siyah nokta sıklığı ne düzeyde?",
        options: [
            { text: "Çok", value: "acne" },
            { text: "Biraz", value: "oily" },
            { text: "Yok", value: "normal" }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
const backButton = document.getElementById("back-btn");
const ANSWER_KEY = "glowderm_answers";
const QUIZ_DONE_KEY = "glowderm_quiz_completed_v1";
const ROUTINE_CACHE_KEY = "glowderm_routine_cache_v1";
const REQUIRED_CATEGORIES = questions.map((q) => q.category);



function showQuestion() {
    const q = questions[currentQuestionIndex];

    document.getElementById("question-text").innerText = q.question;
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;

        // 🔥 GÖRÜNÜMÜ DÜZELTEN SATIR
        btn.classList.add("option-btn");

        btn.onclick = () => selectOption(opt);
        container.appendChild(btn);
    });

    document.getElementById("progress-bar").style.width =
        (currentQuestionIndex / questions.length) * 100 + "%";

    backButton.disabled = currentQuestionIndex === 0;
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}

function saveRoutineToBackend(answers) {
    const apiUrl = window.GLOWDERM_AUTH && window.GLOWDERM_AUTH.routineApi;
    const builder = window.GlowDermRoutine && window.GlowDermRoutine.buildRoutine;
    if (!apiUrl || !builder || typeof productDatabase === "undefined") {
        return Promise.reject(new Error("Rutin kaydedilemedi."));
    }

    const routine = builder(answers, productDatabase);
    return fetch(apiUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": (window.GLOWDERM_AUTH && window.GLOWDERM_AUTH.csrfToken) || getCookie("csrftoken"),
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ answers: answers, routine: routine })
    }).then(function (res) {
        if (!res.ok) throw new Error("Rutin kaydedilemedi.");
        return res.json();
    });
}

function finishQuiz() {
    try {
        localStorage.removeItem(ROUTINE_CACHE_KEY);
        localStorage.setItem(ANSWER_KEY, JSON.stringify(userAnswers));
        localStorage.setItem(QUIZ_DONE_KEY, JSON.stringify({ completed: true }));
    } catch(e) {}

    saveRoutineToBackend(userAnswers)
        .then(function () {
            window.location.href = "rutin.html";
        })
        .catch(function () {
            alert("Rutininiz sunucuya kaydedilemedi. Lütfen tekrar deneyin.");
        });
}

function selectOption(option) {
    userAnswers[currentQuestionIndex] = {
        category: questions[currentQuestionIndex].category,
        value: option.value
    };

    // Geri dönüp cevap degistirildiginde sonraki cevaplari temizle
    userAnswers = userAnswers.slice(0, currentQuestionIndex + 1);
    localStorage.setItem(ANSWER_KEY, JSON.stringify(userAnswers));

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    } 
} 

function goBack() {
    if (currentQuestionIndex === 0) return;
    currentQuestionIndex--;
    showQuestion();
}

if (window.GLOWDERM_AUTH && window.GLOWDERM_AUTH.loggedIn && backButton) {
  backButton.addEventListener("click", goBack);
  showQuestion();
} else {
  const qt = document.getElementById("question-text");
  const oc = document.getElementById("options-container");
  if (qt) {
    qt.textContent = "";
  }
  if (oc) {
    oc.innerHTML = "";
  }
}
