// Define the quiz questions as an array of objects
const quizQuestions = [
    {
      question: "Which of these is a programming language?",
      options: ["bite", "itch", "gnaw", "scratch"],
      answerIndex: 4
    },
    {
      question: "People who write computer code are?",
      options: ["profssors", "instructors", "programmers", "manufacturers"],
      answerIndex: 3
    },
    {
      question: "Which of these is not a programming language?",
      options: ["Python", "Java", "Banana", "Ruby"],
      answerIndex: 3
    },
    // Add more questions here
  ];
  
  // Define the quiz state
  let quizState = {
    currentQuestionIndex: 0,
    timeRemaining: 60,
    score: 0
  };
  
  // Define DOM elements for easy access
  const startButton = document.getElementById("start-button");
  const quizElement = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("score");
  const highScoresElement = document.getElementById("high-scores");
  
  // Define event listener for start button
  startButton.addEventListener("click", startQuiz);
  
  // Define event listener for options
  optionsElement.addEventListener("click", handleOptionClick);
  
  // Define event listener for high scores
  highScoresElement.addEventListener("click", showHighScores);
  
  function startQuiz() {
    // Hide the start button and show the quiz element
    startButton.style.display = "none";
    quizElement.style.display = "block";
  
    // Set the initial timer and score
    quizState.timeRemaining = 60;
    quizState.score = 0;
  
    // Display the first question
    displayQuestion();
  }
  
  function displayQuestion() {
    // Get the current question object
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  
    // Display the question text
    questionElement.textContent = currentQuestion.question;
  
    // Clear the options element
    optionsElement.innerHTML = "";
  
    // Display the answer options
    currentQuestion.options.forEach((optionText, index) => {
      const optionElement = document.createElement("button");
      optionElement.textContent = optionText;
      optionElement.setAttribute("data-index", index);
      optionsElement.appendChild(optionElement);
    });
  
    // Update the timer and score display
    updateTimer();
    updateScore();
  }
  
  function handleOptionClick(event) {
    if (event.target.matches("button")) {
      const selectedOptionIndex = parseInt(event.target.getAttribute("data-index"));
      const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  
      if (selectedOptionIndex === currentQuestion.answerIndex) {
        // Correct answer - increment score
        quizState.score++;
      } else {
        // Incorrect answer - subtract time
        quizState.timeRemaining -= 10;
        if (quizState.timeRemaining < 0) {
          quizState.timeRemaining = 0;
        }
      }
  
      // Move on to the next question or end the quiz if all questions have been answered
      quizState.currentQuestionIndex++;
      if (quizState.currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
  }