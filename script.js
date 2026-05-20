
// 1. फ्री और प्रीमियम सवालों का डेटाबेस
const freeQuestions = [
    {
        question: "IPL के इतिहास में सबसे ज़्यादा रन बनाने वाला खिलाड़ी कौन है?",
        options: ["रोहित शर्मा", "विराट कोहली", "महेंद्र सिंह धोनी", "क्रिस गेल"],
        correct: 1
    }
];

const premiumQuestions = [
    {
        question: "[VIP] भारत की सबसे कठिन और प्रतिष्ठित परीक्षा कौन सी है?",
        options: ["JEE", "NEET", "UPSC (IAS)", "SSC CGL"],
        correct: 2
    },
    {
        question: "[VIP] क्रिकेट में 100 अंतर्राष्ट्रीय शतक लगाने वाले एकमात्र खिलाड़ी कौन हैं?",
        options: ["सचिन तेंदुलकर", "विराट कोहली", "रिकी पोंटिंग", "ब्रायन लारा"],
        correct: 0
    }
];

// ग्लोबल वेरिएबल्स
let currentQuestionsSet = [];
let currentQuizIndex = 0;
let userScore = 0;
let isAnswered = false;
let isPremiumUser = false; // शुरू में यूज़र प्रीमियम नहीं है

// स्क्रीन बदलने वाले एलिमेंट्स
const loginScreen = document.getElementById("login-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const quizScreen = document.getElementById("quiz-screen");

// लॉगिन हैंडल करने का फंक्शन
function handleLogin() {
    const name = document.getElementById("username-input").value.trim();
    if (name === "") {
        alert("कृपया अपना नाम दर्ज करें!");
        return;
    }
    document.getElementById("user-display-name").innerText = name;
    loginScreen.style.display = "none";
    dashboardScreen.style.display = "block";
}

// क्विज़ शुरू करने का फंक्शन (फ्री या प्रीमियम)
function startQuiz(type) {
    if (type === 'free') {
        currentQuestionsSet = freeQuestions;
        goToQuizScreen();
    } else if (type === 'premium') {
        if (isPremiumUser) {
            currentQuestionsSet = premiumQuestions;
            goToQuizScreen();
        } else {
            // प्रीमियम अनलॉक करने के लिए कोड मांगें
            let activationCode = prompt("प्रीमियम क्विज़ अनलॉक करने के लिए एक्टिवेशन कोड डालें (हिंट: SONU99):");
            if (activationCode === "SONU99") {
                isPremiumUser = true;
                document.getElementById("premium-status-text").innerText = "UNLOCKED ✅";
                alert("बधाई हो! प्रीमियम वर्जन अनलॉक हो गया है। अब खेलने के लिए दोबारा क्लिक करें।");
            } else {
                alert("गलत कोड! प्रीमियम कोड खरीदने के लिए एडमिन से संपर्क करें।");
            }
        }
    }
}

function goToQuizScreen() {
    dashboardScreen.style.display = "none";
    quizScreen.style.display = "block";
    currentQuizIndex = 0;
    userScore = 0;
    loadQuestion();
}

// प्रश्न स्क्रीन पर लोड करने का लॉजिक
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

    let qData = currentQuestionsSet[currentQuizIndex];
    document.getElementById("question").innerText = qData.question;
    
    btns.forEach((btn, idx) => {
        btn.innerText = qData.options[idx];
        btn.onclick = () => checkUserAnswer(idx, btns);
    });
}

// सही/गलत उत्तर जांचना
function checkUserAnswer(selectedIdx, btns) {
    if (isAnswered) return;
    isAnswered = true;

    let correctIdx = currentQuestionsSet[currentQuizIndex].correct;
    const nextBtn = document.getElementById("next-btn");

    if (selectedIdx === correctIdx) {
        btns[selectedIdx].style.backgroundColor = "#2ecc71";
        btns[selectedIdx].style.color = "white";
        btns[selectedIdx].style.borderColor = "#2ecc71";
        userScore++;
    } else {
        btns[selectedIdx].style.backgroundColor = "#e74c3c";
        btns[selectedIdx].style.color = "white";
        btns[selectedIdx].style.borderColor = "#e74c3c";
        
        btns[correctIdx].style.backgroundColor = "#2ecc71";
        btns[correctIdx].style.color = "white";
        btns[correctIdx].style.borderColor = "#2ecc71";
    }
    nextBtn.style.display = "block";
}

// अगला प्रश्न बटन पर क्लिक
document.getElementById("next-btn").addEventListener("click", () => {
    currentQuizIndex++;
    if (currentQuizIndex < currentQuestionsSet.length) {
        loadQuestion();
    } else {
        // क्विज़ समाप्त होने पर स्कोर कार्ड दिखाना
        quizScreen.innerHTML = `
            <h2 style="margin-bottom: 15px; color: #2c3e50;">क्विज़ पूरा हुआ!</h2>
            <p style="font-size: 22px; font-weight: bold; color: #2ecc71; margin-bottom: 25px;">आपका स्कोर: ${userScore} / ${currentQuestionsSet.length}</p>
            <button class="action-btn" onclick="location.reload()">मुख्य स्क्रीन पर जाएं</button>
        `;
    }
});
