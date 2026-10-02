// ======================================================
// QUESTIONS
// ======================================================
const questions = [ // Populate this array with question objects as needed.
// Each question object should have the following structure://
    { question: 
        "What symbol do CSS at-rules always begin with?", 
      choices: ["#", ".", "@", "&"],
      answer: 2, 
      explanation: 
        "CSS at-rules always begin with the @ symbol",
    },
    { question:
        "Which CSS at-rule is commonly used for responsive design?",
      choices: ["@media", "@font-face", "@import", "@namespace"],
      answer: 0,
      explanation: 
        "@media applies CSS when certain conditions are true and is commonly used for responsive design.",
    },
     {question: 
        "What is the purpose of @keyframes?",
      choices: ["Import another stylesheet", "Define stages of a CSS animation", "Load a custom font", "Define XML namespaces"],
      answer: 1,
      explanation: 
        "@keyframes is used to define the different stages of a CSS animation.",
    },
     {question: 
        "Which element can contain HTML content such as icons or images?",
      choices: ["<button>", "<input type=\"button\">", "Both", "Neither" ],
      answer: 0,
      explanation:
        "<button> can contain text and other HTML elements such as icons, images, or spans.",
    },
     {question: 
        "Where is the text of an <input type=\"button\"> defined?",
      choices: ["Inside the element", "In the value attribute", "In the name attribute", "In the type attribute"],
      answer: 1,
      explanation: 
        "<input type=\"button\"> uses the value attribute to define its text",
    },
     {question: 
        "What does a <datalist> provide?",
      choices: ["A fixed menu", "Suggestions for an input", "A submit button", "A CSS layout"],
      answer: 1,
      explanation:
        "<datalist> provides suggestions for an <input> element.",
    },
     {question: 
        "What is a main difference between <datalist> and <select>?",
      choices: ["<select> allows custom values", "<datalist> allows custom input", "<select> must use an input", "<datalist> cannot contain options"],
      answer: 1,
      explanation:
        "<datalist> provides suggestions while still allowing the user to type their own value.",
    },
     {question: 
        "What is ECMAScript?",
      choices: ["A browser", "A CSS framework", "The standard that defines how JavaScript should work", "A Microsoft browser language"],
      answer: 2,
      explanation:
        "ECMAScript is the official standard that defines how JavaScript should work.",
    },
     {question: 
        "What was JScript?",
      choices: ["Microsoft's implementation of JavaScript", "A CSS language", "A JavaScript framework", "Another name for ES6"],
      answer: 0,
      explanation:
        "JScript was Microsoft's implementation of JavaScript and was used mainly with older Microsoft technologies",
    },
     {question: 
        "Which feature was introduced with ES6?",
      choices: ["HTML tables", "let and const", "CSS media queries", "<select>"],
      answer: 1,
      explanation:
        "ES6 introduced features such as let and const, arrow functions, classes, template literals, and modules.",
    }
  ];
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) { //Remembers the answer of each question, so when we go back we can still see it
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion = currentQuestion + 1;
  }
  renderQuestion();
}

function goPrevious() {
  if (currentQuestion > 0) {
    currentQuestion = currentQuestion -1;
  }
  renderQuestion();
}

function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}

function goLast() {
  currentQuestion = questions.length -1; 
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  let count = 0; 
  for (let i = 0; i < questions.length; i++){
    if (userAnswers[i]==questions[i].answer){
      count = count + 1; 
    }
  }
  return count; 
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  let Percentage = 0; 
  Percentage = (score / questions.length) * 100;
  return Math.round(Percentage); //To round to the nearest integer 
}


// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  let message = "";
 if (percentage <= 100 && percentage >= 80) {
    message = "Excellent!"
  }
 else if (percentage <= 79 && percentage >= 60) {
  message = "Good"
  }
 else if (percentage <= 59 && percentage >= 50) {
  message = "Pass"
 }
 else {
  message = "Needs improvement"
 }
return message; 
}

// ======================================================
// BUILD CORRECTION
// ======================================================
function buildCorrection() {
  let correction = "";
  for (let i = 0; i < questions.length; i++){
    correction += 
    "Question " + (i+1) + " :" + questions[i].question + "\n" + "\n" +
    "Your answer: " +    (userAnswers[i] === undefined
                ? "Not Answered"
                : questions[i].choices[userAnswers[i]])  + "\n" +
    "Correct Answer: " + questions[i].choices[questions[i].answer] + "\n" +
    "Result:" + (userAnswers[i] === questions[i].answer
                ? "Correct"
                : "Incorrect") + "\n" +

    "Explanation: " +
    questions[i].explanation + "\n\n"; 
  }

  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
