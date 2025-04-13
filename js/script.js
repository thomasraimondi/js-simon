const play = document.getElementById("play");
const countdown = document.getElementById("countdown");
const numbersList = document.getElementById("numbers-list");
const instructions = document.getElementById("instructions");

// * GetInputUser

const answerForms = document.getElementById("answers-form");
const inputUserNumber = document.getElementsByTagName("input");
const message = document.getElementById("message");

// * globalVariables

let remainingMs = 2000;
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

const randomNumber = (max, min) => {
  const value = Math.floor(Math.random() * (max - min + 1) + 1);
  return value;
};

const addNumbersInList = () => {
  const list = [];
  for (i = 0; i < 5; i++) {
    const listItem = randomNumber(100, 1);
    originNumber.push(listItem);
    list.push(`<li>${listItem}</li>`);
  }
  console.log(list);

  return list;
};

/**
 *
 * @param {number} originNumber
 * @param {number} userNumber
 * @returns number
 */
const compare = (originNumber, userNumber) => {
  let numberFuond = 0;
  for (let i = 0; i < originNumber.length; i++) {
    const currentOriginValue = originNumber[i];
    // console.log(currentOriginValue);

    for (let y = 0; y < userNumber.length; y++) {
      const currentUserValue = userNumber[y];
      //   console.log(currentUserValue);

      if (currentOriginValue == currentUserValue) {
        numberFuond += 1;
        // console.log(numberFuond);
      }
    }
  }
  return numberFuond;
};

const getUserInput = (userInput) => {
  const numberInput = [];

  for (let i = 0; i < inputUserNumber.length; i++) {
    if (inputUserNumber[i].type.toLowerCase() == "number") {
      numberInput.push(parseInt(inputUserNumber[i].value));
    }
  }
  return numberInput;
};

play.addEventListener("click", () => {
  console.warn(`Valore: ${play.textContent}`);
  if (play.textContent === "Inizia il gioco") {
    remainingMs = 2000;
    play.innerText = "Termina il gioco";
    countdown.innerText = remainingMs / 1000;
    countdown.classList.remove("d-none");
    numbersList.classList.remove("d-none");
    instructions.classList.remove("d-none");
    timer();
    numbersList.innerHTML = addNumbersInList();
  } else {
    play.innerText = "Inizia il gioco";
    countdown.classList.add("d-none");
    numbersList.classList.add("d-none");
    instructions.classList.add("d-none");
    clearInterval(coutndownIntervalId);
    coutndownIntervalId = undefined;
    answerForms.classList.add("d-none");
  }
});
answerForms.addEventListener("submit", (event) => {
  event.preventDefault();

  const UserInput = getUserInput(inputUserNumber);
  const howManyNumberFound = compare(originNumber, UserInput);
  console.log(UserInput);
  console.log(howManyNumberFound);
  message.innerText = `hai indovinato ${howManyNumberFound} numeri!`;
});
