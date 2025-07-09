
  // DOM Elements
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-btn");
  const quizScreen = document.getElementById("quiz-screen");
  const questionText = document.getElementById("question-text");
  const currentQuestionSpan = document.getElementById("current-question");
  const totalQuestionSpan = document.getElementById("total-questions");
  const scoreSpan = document.getElementById("score");
  const answersContainer = document.getElementById("answers-container");
  const resultScreen = document.getElementById("result-screen");
  const finalScoreSpan = document.getElementById("final-score");
  const maxScoreSpan = document.getElementById("max-score");
  const resultMessage = document.getElementById("result-message");
  const restartButton = document.getElementById("restart-btn");
  const progressBar = document.getElementById("progress");
  
  
  const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
      {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false },
            { text: "Skin", correct: true },
            { text: "Liver", correct: false },
            { text: "Lungs", correct: false },
        ],
    },
      {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Michel angelo", correct: false },
            { text: "Leonardo da Vinci", correct: true },
        ],
    },
      {
        question: "Which ocean is the largest?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Pacific", correct: true },
            { text: "Arctic", correct: false },
        ],
    },
]

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
 startButton.addEventListener("click", startQuiz)
 restartButton.addEventListener("click", restartQuiz)


 function startQuiz(){
    // reset vars
    currentQuestionIndex = 0; 
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
 }
       
 function showQuestion(){
    // reset state  
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex] 

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
    answersContainer.innerHTML = ""

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text;
        button.classList.add("answer-btn")

        // what is dataset? it's a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct 

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
        
    });
 }
 
 function selectAnswer(event){
    if(answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // todo: explain this in a sec
    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct"); 
        } else {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResult()
        }
    },1000)
 }

 function showResult() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Perpect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep Studying! You'll get better!"
    }
}   
 function restartQuiz(){
    resultScreen.classList.remove("active")

    startQuiz();
 }

 
























