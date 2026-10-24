// ======================================================
// QUESTIONS
// ======================================================
let total = 0;
const cache = {};

async function getQuestion(index) {
 if (cache[index]){
  return cache[index]; 
 }// 1. If this question is already in cache, return the cached copy
 else {
  try{
    const response  = await fetch (`/api/question/${index}`); // 2. Otherwise fetch it from `/api/question/${index}` (relative URL)
    if (!response.ok) {
      throw new Error("HTTP " + response.status);  // 3. Check response.ok; if the request failed, throw an error
    }
  const data = await response.json();
  cache[index] = data; //4. Read the JSON, store it in cache[index], and return it
  return data;
  }
  catch (error) {
  throw new Error("Could not load question:" + error.message);
  }
}
}
 
 
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = [];

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
  if (currentQuestion < total - 1) {
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
  currentQuestion = total -1; 
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
async function calculateScore() {
  let count = 0; 
  for (let i = 0; i < total; i++){
    if (userAnswers[i]==(await getQuestion(i)).answer){
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
  Percentage = (score / total) * 100;
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
async function buildCorrection() {
  let correction = "";
  for (let i = 0; i < total; i++){
    correction += 
    "Question " + (i+1) + " :" + (await getQuestion(i)).question + "\n" + "\n" +
    "Your answer: " +    (userAnswers[i] === undefined
                ? "Not Answered"
                : (await getQuestion(i)).choices[userAnswers[i]])  + "\n" +
    "Correct Answer: " + (await getQuestion(i)).choices[(await getQuestion(i)).answer] + "\n" +
    "Result:" + (userAnswers[i] === (await getQuestion(i)).answer
                ? "Correct"
                : "Incorrect") + "\n" +

    "Explanation: " +
    (await getQuestion(i)).explanation + "\n\n"; 
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
async function submitQuiz() {
  const score = await calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = await buildCorrection();
  showResults(score, percentage, message, correction);
}

async function renderQuestion() {
  
  document.getElementById("loading").hidden = false;
  document.getElementById("error").hidden = true;
  let q;
  try {
   q = await getQuestion(currentQuestion);
  } 
  catch (error) {
  document.getElementById("error").hidden = false;
  document.getElementById("error").textContent = error.message;
  return;
  }
  finally {
    document.getElementById("loading").hidden = true;
  }
  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${total}`;

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
    currentQuestion === total - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === total - 1;
}

async function init(){
  try{
  const response = await fetch (`/api/questions/count`); 
  if (!response.ok) {
      throw new Error("HTTP " + response.status);
  } 
  const data = await response.json(); 
  total = data.count;
}
  catch (error) {
  document.getElementById("error").hidden = false; 
  document.getElementById("error").textContent = error.message;
  return; 
  }
 await renderQuestion();
}



 

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
init(); 
