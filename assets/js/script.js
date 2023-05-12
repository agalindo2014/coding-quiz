// Define the quiz questions as an array of objects
const quizQuestions = [
  {
    question: "Which of these is a programming language?",
    options: ["scratch", "itch", "gnaw", "bite"],
    answerIndex: 0,
  },
  {
    question: "People who write computer code are?",
    options: ["programmers", "instructors", "builders", "manufacturers"],
    answerIndex: 0,
  },
  {
    question: "Which of these is not a programming language?",
    options: ["Banana", "Java", "CSS", "Ruby"],
    answerIndex: 0,
  },
  // Add more questions here
];

// Define the quiz state
let quizState = {
  currentQuestionIndex: 0,
  timeRemaining: 60,
  score: 0,
}

// Define DOM elements for easy access
const startButton = document.getElementById("start-button");
const quizElement = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const optionsButtonsElement = document.getElementById("options-buttons");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const highScoresElement = document.getElementById("high-scores");
const initialsInput = document.getElementById("initials-input");
const submitButton = document.getElementById("submit-button");
const highScoresList = document.getElementById("high-scores-list");
const quizContainer = document.getElementById("quiz-container");
const viewScrBtn = document.getElementById("view-scores-btn");
const highscoresEl = document.getElementById("high-scores");
const saveScoreForm = document.getElementById("save-score-form");
const element = document.getElementById("myElement");
const answerIndex = document.getElementById("answer-Result")


// Event listeners
startButton.addEventListener("click", startQuiz);
optionsButtonsElement.addEventListener("click", handleOptionClick);
saveScoreForm.addEventListener("submit", saveScore);

// Start quiz function
function startQuiz() {
  // Hide start button
  startButton.classList.add("hide");

  // Start timer
  quizState.timerId = setInterval(updateTimer, 1000);

  // Show first question
  showQuestion();
}

// Show question function
function showQuestion() {
  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  optionsButtonsElement.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.setAttribute("data-index", index);
    optionsButtonsElement.appendChild(button);
  });
}

function handleOptionClick(event) {
  if (event.target.matches("button")) {
    const selectedOptionIndex = parseInt(event.target.getAttribute("data-index"));
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

    if (selectedOptionIndex === currentQuestion.answerIndex) {
      // Correct answer
      quizState.score++;
    } else {
      // Incorrect answer
      quizState.timeRemaining -= 10;
    }

    quizState.currentQuestionIndex++;

    if (quizState.currentQuestionIndex >= quizQuestions.length) {
      clearInterval(quizState.timerId);
      showResult();
    } else {
      showQuestion();
    }
  }
}

function hideQuiz() {
  // Check if the element exists before trying to hide it
  let highScoresList = document.getElementById("highScoresList");
  if (highScoresList) {
    highScoresList.classList.add("hide");
  }

  // Hide quiz and show start button
  quizContainer.classList.add("hide");
  startButton.classList.remove("hide");
}



function updateTimer() {
  quizState.timeRemaining--;
  timeElement.textContent = `Time: ${quizState.timeRemaining}`;

  if (quizState.timeRemaining <= 0) {
    clearInterval(quizState.timerId);
    showResult();
  }
}


// Save score function
function saveScore(event) {
  event.preventDefault();

  const initials = initialsInput.value.trim();
  const score = quizState.score;

  if (initials !== "") {
    // Get existing scores from local storage or initialize empty array
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add current score to high scores array
    highScores.push({ initials, score });

    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Store high scores array in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to high scores page
    window.location.href = ("highscores.html");
  }
}

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
      highscoresEl.style.display = "block";
  } else if (highscoresEl.style.display === "block") {
      highscoresEl.style.display = "none";
  } else {
      return alert("No scores to show.");
  }
});
function checkAnswer(answer) {
  // Check if answer is correct
  if (answer === questions[currentQuestion].correctAnswer) {
    // Increase score
    score += 10;
    // Show correct feedback
    answerResult.textContent = "Correct!";
  } else {
    // Deduct time from timer
    timerCount -= 10;
    // Show incorrect feedback
    answerResult.textContent = "Incorrect.";
  }
  function startQuiz() {
    // Initialize answerIndex
    answerIndex = 0; 
  }
  
  // Increment answer index
  answerIndex++;

  // Check if there are more questions
  if (answerIndex < questions.length) {
    // Show next question
    showQuestion(answerIndex);
  } else {
    // End quiz
    endQuiz();
  }
}
// Show result function
function showResult() {
  // Hide quiz elements
  quizElement.classList.add("hide");
  timeElement.classList.add("hide");

  // Show score element
  scoreElement.classList.remove("hide");
  scoreElement.textContent = `Your score is: ${quizState.score}`;

  // Show save score form
  saveScoreForm.classList.remove("hide");
}


