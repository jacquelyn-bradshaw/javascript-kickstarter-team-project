// variable for username input
const username = document.getElementById("username");
//   variable for number of questions input
const quizSize = document.getElementById("numOfQuestions");
// variable for next question button
const moveToNextQuestion = document.getElementById("moveToNextQuestion");

// variables for showing and hiding elements
const inputColumnID = document.getElementById("inputColumnID");
const startButton = document.getElementById("startButton");
const nextQuestionButton = document.getElementById("nextQuestionButton");
const answerChoicesDiv = document.getElementById("answerChoices");
const selectAnswer = document.getElementById("selectAnswer");
const questionNumber = document.getElementById("questionNumber");
const goodLuckMessage = document.getElementById("goodLuckMessage");

// create element
let congratsMessage = document.createElement("div");
congratsMessage.style.fontSize = "26px";
congratsMessage.style.textAlign = "center";
congratsMessage.style.color = "blue";
congratsMessage.style.marginTop = "20px";

// create global variable to capture quiz question number. This number is used in button colour change function later on
let globalQuestionNumber = 0;
console.log(`starting globalQuestionNumber = ${globalQuestionNumber}`);

// create global variable to capture score
let score = 0;
console.log("score:" + score);

// create class template for question objects
class questionObject {
  constructor(question, questionSerialNo, answers) {
    this.question = question;
    this.questionSerialNo = questionSerialNo;
    //     this.answer array = ["", true] ie a string and a bool of true if correct answer and false if incorrect answer
    this.buttonA = answers[0];
    this.buttonB = answers[1];
    this.buttonC = answers[2];
    this.buttonD = answers[3];
    this.correctAnswer = answers[4];
  }
  //   allows you to check the info contained in a question object
  displayQuestionObjectInfo() {
    return `${this.question} ${this.questionSerialNo} ${this.answerA} ${this.answerB} ${this.answerC} ${this.answerD} ${this.correctAnswer}`;
  }
}

// create array of all quiz questions and answers and a boolean to indicate correct answer
const questionsAndAnswers = [
  [
    "What is the capital of Australia?",
    ["Canberra", "Sydney", "Melbourne", "Adelaide", "Canberra"]
  ],
  [
    "Which river flows through Paris?",
    ["Oise", "Meuse", "Seine", "Moselle", "Seine"]
  ],
  [
    "Which is the tallest mountain in the world?",
    ["Kilimanjaro", "Everest", "K2", "Mont Blanc", "Everest"]
  ],
  [
    "What is the fastest land animal?",
    ["Cheetah", "Springbok", "Horse", "Wildebeest", "Cheetah"]
  ],
  [
    "How many continents are there in the world?",
    ["6", "5", "8", "7", "7"]
  ],
  [
    "What is the largest mammal in the world?",
    ["Hippopotamus", "Blue Whale", "Giraffe", "Elephant seal", "Blue Whale"]
  ],
  [
    "Which fictional wizard lives at 4 Privet Drive, Little Whinging?",
    ["Albus Dumbledore", "Ron Weasley", "Harry Potter", "Hermione", "Harry Potter"]
  ],
  [
    "What is the name of the streaming service that hosts Stranger Things?",
    ["Disney", "Amazon Prime Video", "Apple TV", "Netflix", "Netflix"]
  ],
  [
    "What is the process by which plants make their own food called?",
    ["Photosynthesis", "Respiration", "Transpiration", "Photoperiodism", "Photosynthesis"]
  ],
  [
    "What is the largest organ in the human body?",
    ["Liver", "Brain", "Skin", "Lungs", "Skin"]
  ],
  [
    "What is the capital city of Japan?",
    ["Yokohama", "Osaka", "Nagoya", "Tokyo", "Tokyo"]
  ],
  [
    "What is the tallest mammal in the world?",
    ["Elephant", "Giraffe", "Ostrich", "Brown Bear", "Giraffe"]
  ],
  [
    "Which gas makes up the majority of Earth's atmosphere?",
    ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen", "Nitrogen"]
  ],
  [
    "Who was the first person to step on the moon?",
    ["Buzz Aldrin", "Pete Conrad", "Neil Armstrong", "Alan Bean", "Neil Armstrong"]
  ],
  [
    "What is the largest planet in our solar system?",
    ["Jupiter", "Saturn", "Uranus", "Neptune", "Jupiter"]
  ]
];

// create array of question objects that will be used for the quiz
const questionArray = [];
// console.log(`questionArray contains ${questionArray}`);
// create 15 question objects and populates the questionArray
for (let i = 0; i < questionsAndAnswers.length; i++) {
  //   questionsAndAnswers[i][0] gets the ith question from the questionsAndAnswers array
  const question = questionsAndAnswers[i][0];
  //   i+1 assigns the value of i+1 to this.questionSerialNo in the question object and starts the sequence from 1 not zero
  const serialNo = i + 1;
  //   questionsAndAnswers[i][1] gets the nested array with the 4 answer choices
  const answerChoices = questionsAndAnswers[i][1];
  // create an instance of the questionObject class
  let myQuestion = new questionObject(question, serialNo, answerChoices);
  //   push the object instance to questionArray
  questionArray.push(myQuestion);
  // console.log(myQuestion);
}

// check the array of question objects
// console.log(questionArray);

// function to generate quiz questions of number selected by user
function quizQuestions(requestedNumQuestions) {
  //   hide user input DOM elements from display
  inputColumnID.style.display = "None";
  startButton.style.display = "None";
  //   show question DOM elements in display
  nextQuestionButton.style.display = "flex";
  answerChoicesDiv.style.display = "flex";
  selectAnswer.style.display = "flex";
  questionNumber.style.display = "block";
  goodLuckMessage.style.display = "block";

  // get first question to display by calling nextQuestion(globalQuestionNumber)
  nextQuestion(requestedNumQuestions);
}

function nextQuestion(numQuestions) {
  // check progress through question array
  console.log(`globalQuestionNumber = ${globalQuestionNumber}`);
  // assign the anonymous function for the event listener to a variable so it can be re-used later to remove the event listener during reset.
  let eventListenerFunction = function () {
    // add one to the globalQuestionNumber to keep track of which question we're up to
    globalQuestionNumber += 1;
    // console.log(`globalQuestionNumber = ${globalQuestionNumber}`);
    // recursively call the function again to see if there is another question
    if (globalQuestionNumber < numQuestions) {
      populateQuestionInDOM();
    } else {
      moveToNextQuestion.removeEventListener("click", eventListenerFunction);
      console.log(`index is ${globalQuestionNumber}, end of quiz`);
      congratsMessage.innerHTML = `Congratulations, your score was ${score}!`;
      document.body.appendChild(congratsMessage);
      clearInterval(countdownInterval);
      countingElement.innerHTML = "";
    }
  };
  // if question index < requested number of questions - 1, the set the next question in the DOM
  if (globalQuestionNumber < numQuestions) {
    populateQuestionInDOM();
    moveToNextQuestion.addEventListener("click", eventListenerFunction);
  } else {
    console.log(`index is ${globalQuestionNumber}, end of quiz`);
  }
}

function populateQuestionInDOM() {
  startCountdown();
  // clear styling from answer buttons
  let buttons = document.getElementsByClassName("answerButton");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("green", "red");
  }
  console.log("In populateQuestionInDOM function");
  //   get DOM elements that link to the question Objects
  const setAnswerChoiceA = document.getElementById("choiceA");
  const setAnswerChoiceB = document.getElementById("choiceB");
  const setAnswerChoiceC = document.getElementById("choiceC");
  const setAnswerChoiceD = document.getElementById("choiceD");
  // check variables after reset
  console.log(
    `in PQID fn: ${globalQuestionNumber},
      ${questionArray[globalQuestionNumber].questionSerialNo}`
  );
  // assign question and question number to the DOM paragraph
  questionNumber.innerHTML = `Question ${questionArray[globalQuestionNumber].questionSerialNo}: ${questionArray[globalQuestionNumber].question}`;
  //     assign answer choices to the <li> elements in the DOM
  setAnswerChoiceA.innerHTML = questionArray[globalQuestionNumber].buttonA;
  setAnswerChoiceB.innerHTML = questionArray[globalQuestionNumber].buttonB;
  setAnswerChoiceC.innerHTML = questionArray[globalQuestionNumber].buttonC;
  setAnswerChoiceD.innerHTML = questionArray[globalQuestionNumber].buttonD;
}

// function to test user inputs, send good luck message, and start quiz
function startQuiz() {
  // console.log(username.value, quizSize.value, goodLuckMessage.textContent);
  //     handle if both inputs not made by user
  const numberOfQuestions = parseInt(quizSize.value);
  if (quizSize.value === "" || username.value.trim() === "") {
    //     remind user to enter name and wanted number of questions
    alert("Please enter your name and the number of questions");
  } else if (numberOfQuestions > 15) {
    alert("Exceeded maximum number of questions allowed.");
  } else if (numberOfQuestions <= 0) {
    alert("Please enter a number of questions between 1 and 15");
  } else {
    //       create html para with good luck message
    goodLuckMessage.innerHTML = `Good luck ${username.value}!`;
    //     call function to run the quiz with the number of questions specified by the user
    quizQuestions(quizSize.value);
  }
}

function buttonColourChange(buttonChoice) {
  // get data based on user's choice of button
  // get the button letter
  const userAnswerSelection = buttonChoice.getAttribute("data-buttonChoice");
  // create string based on selected letter than corresponds to a question Object property
  const userButtonHTMLId = `button` + userAnswerSelection;
  // get the reference to the correct question in the array of question objects
  // const indexInQuestionArray = globalQuestionNumber;
  // get the correct answer for the question
  const correctAnswerChoice = questionArray[globalQuestionNumber].correctAnswer;
  // get all the answer buttons from the DOM
  let buttons = document.getElementsByClassName("answerButton");
  // remove any previous styling from user's choice of answer
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("green", "red");
  }
  // change button colour to green if correct answer
  if (
    questionArray[globalQuestionNumber][userButtonHTMLId] == correctAnswerChoice
  ) {
    // console.log("correct answer");
    // add green background to button
    document.getElementById(userButtonHTMLId).classList.add("green");
    // Increase score by 1
    score++;
    console.log("updated score:" + score);
  } else {
    // console.log("Wrong, try again");
    // add red background to button
    document.getElementById(userButtonHTMLId).classList.add("red");
  }
}

function reset() {
  //   show user input DOM elements from display
  inputColumnID.style.display = "block";
  startButton.style.display = "block";
  //   hide question DOM elements in display
  nextQuestionButton.style.display = "none";
  answerChoicesDiv.style.display = "none";
  selectAnswer.style.display = "none";
  questionNumber.style.display = "none";
  goodLuckMessage.style.display = "none";

  // Reset values
  username.value = "";
  quizSize.value = "";
  globalQuestionNumber = 0;
  score = 0;

  // Remove element from the DOM
  congratsMessage.remove();

  // Stop and remove countdown
  clearInterval(countdownInterval);
  countingElement.innerHTML = "";
  // console.log(questionsAndAnswers, questionArray);
}

const startingMinutes = 0.5;
let time;
const countingElement = document.getElementById("countdown");
let countdownInterval;

function startCountdown() {
    countingElement.style.display = "block";
    // Reset time to starting value when the button is clicked
    time = startingMinutes * 60;
    // Clear the existing interval before setting up a new one
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
    startButton.disabled = true; // Disable the button once clicked
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countingElement.innerHTML = `0${minutes}:${seconds}`;
  time--;

  if (time < 0) {
    clearInterval(countdownInterval); // Stop the countdown when it reaches 0
    countingElement.innerHTML = "Time's up!";
    startButton.disabled = false; // Enable the button when the countdown is finished
  }
}
