// क्विज़ के सवालों का डेटा
const quizData = [
    {
        question: "IPL के इतिहास में सबसे ज़्यादा रन बनाने वाला खिलाड़ी कौन है?",
        options: ["रोहित शर्मा", "विराट कोहली", "महेंद्र सिंह धोनी", "क्रिस गेल"],
        correct: 1 // विराट कोहली का नंबर 1 है (गिनती 0 से शुरू होती है)
    },
    {
        question: "इनमें से कौन सी टीम ने अभी तक एक बार भी IPL ट्रॉफी नहीं जीती है?",
        options: ["मुंबई इंडियंस", "चेन्नई सुपर किंग्स", "रॉयल चैलेंजर्स बेंगलुरु", "कोलकाता नाइट राइडर्स"],
        correct: 2 // RCB का नंबर 2 है
    }
];

const questionElement = document.getElementById("question");
const btns = [
    document.getElementById("btn0"),
    document.getElementById("btn1"),
    document.getElementById("btn2"),
    document.getElementById("btn3")
];
const nextBtn = document.getElementById("next-btn");

let currentQuiz = 0;
let score = 0;
let answered = false;

// सवाल लोड करने का फंक्शन
function loadQuiz() {
    answered = false;
    nextBtn.style.display = "none"; // शुरू में 'Next' बटन छुपा दें
    
    // हर नए सवाल पर बटन का रंग वापस नार्मल करें
    btns.forEach(btn => {
        btn.style.backgroundColor = "#fff";
        btn.style.color = "#3498db";
    });

    let currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    
    btns.forEach((btn, index) => {
        btn.innerText = currentQuizData.options[index];
        // जब कोई ऑप्शन पर क्लिक करे
        btn.onclick = () => selectAnswer(index);
    });
}

// सही या गलत चेक करने का फंक्शन
function selectAnswer(selectedIndex) {
    if (answered) return; // एक बार क्लिक होने के बाद दोबारा क्लिक न हो
    answered = true;

    let correctIndex = quizData[currentQuiz].correct;

    if (selectedIndex === correctIndex) {
        btns[selectedIndex].style.backgroundColor = "#2ecc71"; // सही के लिए हरा रंग
        btns[selectedIndex].style.color = "white";
        score++; // स्कोर बढ़ाएं
    } else {
        btns[selectedIndex].style.backgroundColor = "#e74c3c"; // गलत के लिए लाल रंग
        btns[selectedIndex].style.color = "white";
        btns[correctIndex].style.backgroundColor = "#2ecc71"; // जो सही है उसे हरा दिखाएं
        btns[correctIndex].style.color = "white";
    }

    nextBtn.style.display = "block"; // जवाब देने के बाद 'Next' बटन दिखाएं
}

// 'Next' बटन का काम
nextBtn.addEventListener("click", () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz(); // अगर सवाल बचे हैं, तो अगला सवाल लोड करें
    } else {
        // अगर सारे सवाल खत्म हो गए तो फाइनल स्कोर दिखाएं
        document.getElementById("quiz-box").innerHTML = `
            <h2 style="margin-bottom: 20px;">आपका स्कोर: ${score} / ${quizData.length}</h2>
            <button class="btn" onclick="location.reload()" style="background-color: #3498db; color: white;">फिर से खेलें</button>
        `;
    }
});

// ऐप शुरू करें
loadQuiz();
