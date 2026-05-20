// डेमो डेटा
const quizData = [
    {
        question: "IPL के इतिहास में सबसे ज़्यादा रन बनाने वाला खिलाड़ी कौन है?",
        options: ["रोहित शर्मा", "विराट कोहली", "महेंद्र सिंह धोनी", "क्रिस गेल"],
        correct: 1
    }
];

const questionElement = document.getElementById("question");
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// पहला सवाल स्क्रीन पर दिखाने का फंक्शन
function loadQuiz() {
    let currentQuizData = quizData[0];
    questionElement.innerText = currentQuizData.question;
    
    btn0.innerText = currentQuizData.options[0];
    btn1.innerText = currentQuizData.options[1];
    btn2.innerText = currentQuizData.options[2];
    btn3.innerText = currentQuizData.options[3];
}

// पेज लोड होते ही सवाल दिखाएं
loadQuiz();
