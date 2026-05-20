// श्रेणियों के अनुसार सवालों का डेटाबेस
const quizDatabase = {
    gk: [
        {
            question: "भारत का सबसे बड़ा राज्य (क्षेत्रफल के आधार पर) कौन सा है?",
            options: ["उत्तर प्रदेश", "राजस्थान", "बिहार", "मध्य प्रदेश"],
            correct: 1
        },
        {
            question: "विश्व का सबसे बड़ा महासागर कौन सा है?",
            options: ["हिंद महासागर", "अटलांटिक महासागर", "प्रशांत महासागर", "आर्कटिक महासागर"],
            correct: 2
        }
    ],
    ipl: [
        {
            question: "IPL के इतिहास में सबसे ज़्यादा रन बनाने वाला खिलाड़ी कौन है?",
            options: ["रोहित शर्मा", "विराट कोहली", "महेंद्र सिंह धोनी", "क्रिस गेल"],
            correct: 1
        },
        {
            question: "किस खिलाड़ी के नाम आईपीएल के एक सीज़न में सबसे ज़्यादा 4 शतक लगाने का रिकॉर्ड है?",
            options: ["विराट कोहली", "जोस बटलर", "क्रिस गेल", "शुभमन गिल"],
            correct: 0
        }
    ],
    upsc: [
        {
            question: "भारतीय संविधान का जनक किसे कहा जाता है?",
            options: ["डॉ. राजेन्द्र प्रसाद", "महात्मा गांधी", "जवाहरलाल नेहरू", "डॉ. बी.आर. अम्बेडकर"],
            correct: 3
        },
        {
            question: "भारत में सिविल सेवा (Civil Services) का जनक किसे माना जाता है?",
            options: ["लॉर्ड कर्जन", "लॉर्ड कॉर्नवॉलिस", "लॉर्ड डलहौजी", "वारेन हेस्टिंग्स"],
            correct: 1
        }
    ]
};

// ग्लोबल वेरिएबल्स
let activeCategory = "";
let currentQuizIndex = 0;
let userScore = 0;
let isAnswered = false;

// पेज लोड की याददाश्त (Persistence)
window.onload = function() {
    const savedName = localStorage.getItem("sonu_user_name");
    const savedUpscStatus = localStorage.getItem("sonu_upsc_premium");

    if (savedName) {
        showDashboard(savedName);
        if (savedUpscStatus === "true") {
            document.getElementById("upsc-status-text").innerText = "UNLOCKED ✅";
        }
    }
};

function handleLogin() {
    const name = document.getElementById("username-input").value.trim();
    if (name === "") { alert("कृपया अपना नाम दर्ज करें!"); return; }
    
    localStorage.setItem("sonu_user_name", name);
    showDashboard(name);
}

function showDashboard(name) {
    document.getElementById("user-display-name").innerText = name;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dashboard-screen").style.display = "block";
    document.getElementById("quiz-screen").style.display = "none";
}

// कैटेगरी के आधार पर क्विज़ शुरू करना
function startCategoryQuiz(category) {
    const isUpscUnlocked = localStorage.getItem("sonu_upsc_premium") === "true";

    if (category === 'upsc' && !isUpscUnlocked) {
        let code = prompt("UPSC प्रीमियम टेस्ट अनलॉक करने के लिए एक्टिवेशन कोड डालें (SONU99):");
        if (code === "SONU99") {
            localStorage.setItem("sonu_upsc_premium", "true");
            document.getElementById("upsc-status-text").innerText = "UNLOCKED ✅";
            alert("बधाई हो! UPSC प्रीमियम कैटेगरी अनलॉक हो गई है।");
            launchQuiz(category);
        } else {
            alert("गलत कोड! इस प्रीमियम सेक्शन के लिए सही कोड दर्ज करें।");
        }
    } else {
        launchQuiz(category);
    }
}

function launchQuiz(category) {
    activeCategory = category;
    currentQuizIndex = 0;
    userScore = 0;

    document.getElementById("dashboard-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    
    // हेडर में कैटेगरी का नाम दिखाना
    document.getElementById("category-indicator").innerText = "कैटेगरी: " + category.toUpperCase();
    
    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    document.getElementById("next-btn").style.display = "none";
    
    const btns = [
        document.getElementById("btn0"),
        document.getElementById("btn1"),
        document.getElementById("btn2"),
        document.getElementById("btn3")
    ];

    btns.forEach(btn => {
        btn.style.backgroundColor = "#fff";
        btn.style.color = "#2c3e50";
        btn.style.borderColor = "#dcdde1";
    });

    let qData = quizDatabase[activeCategory][currentQuizIndex];
    document.getElementById("question").innerText = qData.question;
    
    btns.forEach((btn, idx) => {
        btn.innerText = qData.options[idx];
        btn.onclick = () => checkAnswer(idx, btns);
    });
}

function checkAnswer(idx, btns) {
    if (isAnswered) return;
    isAnswered = true;

    let correctIdx = quizDatabase[activeCategory][currentQuizIndex].correct;
    const nextBtn = document.getElementById("next-btn");

    if (idx === correctIdx) {
        btns[idx].style.backgroundColor = "#2ecc71";
        btns[idx].style.color = "white";
        btns[idx].style.borderColor = "#2ecc71";
        userScore++;
    } else {
        btns[idx].style.backgroundColor = "#e74c3c";
        btns[idx].style.color = "white";
        btns[idx].style.borderColor = "#e74c3c";
        
        btns[correctIdx].style.backgroundColor = "#2ecc71";
        btns[correctIdx].style.color = "white";
        btns[correctIdx].style.borderColor = "#2ecc71";
    }
    nextBtn.style.display = "block";
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuizIndex++;
    if (currentQuizIndex < quizDatabase[activeCategory].length) {
        loadQuestion();
    } else {
        alert(`शानदार! आपने ${activeCategory.toUpperCase()} क्विज़ पूरा किया। स्कोर: ${userScore}/${quizDatabase[activeCategory].length}`);
        goBackToDashboard();
    }
});

function goBackToDashboard() {
    showDashboard(localStorage.getItem("sonu_user_name"));
}
