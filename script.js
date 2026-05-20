// 1. डेटाबेस
const freeQuestions = [{ question: "IPL के इतिहास में सबसे ज़्यादा रन बनाने वाला खिलाड़ी कौन है?", options: ["रोहित शर्मा", "विराट कोहली", "महेंद्र सिंह धोनी", "क्रिस गेल"], correct: 1 }];
const premiumQuestions = [{ question: "[VIP] भारत की सबसे कठिन परीक्षा कौन सी है?", options: ["JEE", "NEET", "UPSC (IAS)", "SSC CGL"], correct: 2 }];

// वेरिएबल्स
let currentQuestionsSet = [];
let currentQuizIndex = 0;
let userScore = 0;
let isAnswered = false;

// --- नई याददाश्त (Persistence) वाला हिस्सा ---

// पेज लोड होते ही चेक करें कि क्या यूज़र पहले आ चुका है?
window.onload = function() {
    const savedName = localStorage.getItem("sonu_user_name");
    const savedPremium = localStorage.getItem("sonu_premium_status");

    if (savedName) {
        // अगर नाम मिल गया, तो लॉगिन स्क्रीन छुपाएं और डैशबोर्ड दिखाएं
        showDashboard(savedName);
        if (savedPremium === "true") {
            document.getElementById("premium-status-text").innerText = "UNLOCKED ✅";
        }
    }
};

function handleLogin() {
    const name = document.getElementById("username-input").value.trim();
    if (name === "") { alert("कृपया अपना नाम दर्ज करें!"); return; }
    
    // नाम को फोन की मेमोरी में सेव करें
    localStorage.setItem("sonu_user_name", name);
    showDashboard(name);
}

function showDashboard(name) {
    document.getElementById("user-display-name").innerText = name;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dashboard-screen").style.display = "block";
    document.getElementById("quiz-screen").style.display = "none";
}

function startQuiz(type) {
    const isPremium = localStorage.getItem("sonu_premium_status") === "true";

    if (type === 'free') {
        currentQuestionsSet = freeQuestions;
        goToQuizScreen();
    } else if (type === 'premium') {
        if (isPremium) {
            currentQuestionsSet = premiumQuestions;
            goToQuizScreen();
        } else {
            let code = prompt("प्रीमियम कोड डालें (SONU99):");
            if (code === "SONU99") {
                localStorage.setItem("sonu_premium_status", "true"); // प्रीमियम स्टेटस सेव करें
                document.getElementById("premium-status-text").innerText = "UNLOCKED ✅";
                alert("प्रीमियम अनलॉक हो गया!");
            } else {
                alert("गलत कोड!");
            }
        }
    }
}

// बाकी का क्विज़ लॉजिक (पुराना ही रहेगा)
function goToQuizScreen() {
    document.getElementById("dashboard-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    currentQuizIndex = 0; userScore = 0; loadQuestion();
}

function loadQuestion() {
    isAnswered = false; document.getElementById("next-btn").style.display = "none";
    const btns = [document.getElementById("btn0"), document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3")];
    btns.forEach(btn => { btn.style.backgroundColor = "#fff"; btn.style.color = "#2c3e50"; });
    let qData = currentQuestionsSet[currentQuizIndex];
    document.getElementById("question").innerText = qData.question;
    btns.forEach((btn, idx) => { btn.innerText = qData.options[idx]; btn.onclick = () => checkAnswer(idx, btns); });
}

function checkAnswer(idx, btns) {
    if (isAnswered) return; isAnswered = true;
    let correctIdx = currentQuestionsSet[currentQuizIndex].correct;
    if (idx === correctIdx) { btns[idx].style.backgroundColor = "#2ecc71"; btns[idx].style.color = "white"; userScore++; }
    else { btns[idx].style.backgroundColor = "#e74c3c"; btns[idx].style.color = "white"; btns[correctIdx].style.backgroundColor = "#2ecc71"; btns[correctIdx].style.color = "white"; }
    document.getElementById("next-btn").style.display = "block";
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuizIndex++;
    if (currentQuizIndex < currentQuestionsSet.length) { loadQuestion(); }
    else { showDashboard(localStorage.getItem("sonu_user_name")); alert(`क्विज़ पूरा! स्कोर: ${userScore}`); }
});

इसे कॉपी करके GitHub पर अपडेट करें। अब जब आप एक बार लॉगिन करेंगे, तो चाहे आप ब्राउज़र बंद करें या रिफ्रेश करें, सोनू क्लासेज आपको हमेशा आपके नाम से पहचानेगा! 

चेक करके बताएं, क्या अब 'बैक' करने पर वह बार-बार नाम पूछना बंद कर दिया?
