// * getDomElement
const play = document.getElementById("play");
const countdown = document.getElementById("countdown");
const numbersList = document.getElementById("numbers-list");
const instructions = document.getElementById("instructions");

// * getInputUser
const answerForms = document.getElementById("answers-form");
const inputUserNumber = document.getElementsByTagName("input"); // ! ToDo_ changa with queryselectorAll
const message = document.getElementById("message");
const submitForm = document.getElementById("submit-form");

// * globalVariables
let remainingMs = 10000;
let coutndownIntervalId;
let originNumber = [];

// * handleCountdown
const handleCountdown = () => {
  remainingMs -= 1000;

  if (remainingMs >= 0) {
    countdown.innerText = `${remainingMs / 1000}`;
    console.warn(`Rimangono solo ${remainingMs / 1000} secondi`);
  } else {
    numbersList.classList.add("d-none");
    instructions.innerText = "Inserisci tutti i numeri che ricordi";
    answerForms.classList.remove("d-none");
    clearInterval(coutndownIntervalId);
  }
};

// * Trigger
const timer = () => {
  coutndownIntervalId = setInterval(handleCountdown, 1000);
};

// * GenerateRandomNumbaer
const randomNumber = (max, min) => {
  const value = Math.floor(Math.random() * (max - min + 1) + 1);
  return value;
};

// * Add Random number in unothered list
// ! ToDo: change for with While
const addNumbersInList = () => {
  const list = [];
  while (originNumber.length < 5) {}

  for (i = 0; i < 5; i++) {
    const listItem = randomNumber(100, 1);
    originNumber.push(listItem);
    numbersList.innerHTML += `<li>${listItem}</li>`;
  }
};

// ! Todo: change duble for with array methods
const compare = (originNumber, userNumber) => {
  let numberFuond = 0;
  for (let i = 0; i < originNumber.length; i++) {
    const currentOriginValue = originNumber[i];

    for (let y = 0; y < userNumber.length; y++) {
      const currentUserValue = userNumber[y];

      if (currentOriginValue == currentUserValue) {
        numberFuond += 1;
      }
    }
  }
  return numberFuond;
};

const getUserInput = (userInput) => {
  const numberInput = [];

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i].type.toLowerCase() == "number") {
      numberInput.push(parseInt(inputUserNumber[i].value));
    }
  }
  return numberInput;
};

const clearUserInput = (userInput) => {
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i].type.toLowerCase() == "number") {
      userInput[i].value = "";
    }
  }
};

const playGame = () => {
  remainingMs = 10000;
  originNumber = [];
  play.innerText = "Termina il gioco";
  countdown.innerText = remainingMs / 1000;
  countdown.classList.remove("d-none");
  numbersList.classList.remove("d-none");
  instructions.classList.remove("d-none");
  message.innerText = "";
  timer();
  addNumbersInList();
  clearUserInput(inputUserNumber);
};

const retry = () => {
  location.reload();
};

const endGame = () => {
  play.innerText = "Inizia il gioco";
  countdown.classList.add("d-none");
  numbersList.classList.add("d-none");
  instructions.classList.add("d-none");
  clearInterval(coutndownIntervalId);
  coutndownIntervalId = undefined;
  answerForms.classList.add("d-none");
};

play.addEventListener("click", () => {
  console.warn(`Valore: ${play.textContent}`);
  if (play.textContent === "Inizia il gioco") {
    playGame();
  } else {
    endGame();
  }
});

// ! ToDo: add array guessed numbers
answerForms.addEventListener("submit", (event) => {
  event.preventDefault();

  const UserInput = getUserInput(inputUserNumber);
  const howManyNumberFound = compare(originNumber, UserInput);
  console.log(UserInput);
  console.log(howManyNumberFound);
  if (howManyNumberFound === 5) {
    message.innerText = `Complimenti hai indovinato tutti i numeri!`;
  } else {
    message.innerText = `hai indovinato ${howManyNumberFound} numeri!`;
    console.log(`hai indovinato ${howManyNumberFound} numeri!`);
    submitForm.innerText = "Ritenta";
    console.log("ritenta");
  }
});

submitForm.addEventListener("click", () => {
  if (submitForm.textContent === "Ritenta") {
    retry();
  } else if (submitForm.textContent === "Ricomincia") {
    playGame();
  }
});
