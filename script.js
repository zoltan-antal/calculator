let firstNumber = "0";
let secondNumber = null;
let operator = null;
let result = null;

const operatorList = ["+", "-", "×", "÷"];

let frontValue = "0";
let queueValue = "";
const frontDisplay = document.querySelector("#front-display");
const queueDisplay = document.querySelector("#queue-display");
frontDisplay.textContent = frontValue;
queueDisplay.textContent = queueValue;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => numberButton.addEventListener("click", addNumber));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", processOperator));

const equalsButton = document.querySelector("#\\=");
equalsButton.addEventListener("click", processEquals);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);

let toResetFrontDisplay = false;
let toResetQueueDisplay = false;

function addNumber(e) {
  const number = e.target.id;

  if (checkErrors()) {
    return;
  }

  if ((frontValue === "0" && number !== ".") || toResetFrontDisplay) {
    frontValue = "";
    toResetFrontDisplay = false;
  }

  if (toResetQueueDisplay) {
    queueValue = "";
    queueDisplay.textContent = queueValue;
    toResetQueueDisplay = false;
  }

  if (!(number === "." && frontValue.includes("."))) {
    frontValue += number;
  }

  if (checkErrors()) {
    return;
  }
  frontDisplay.textContent = frontValue;

  if (!operator) {
    firstNumber = frontValue;
  } else {
    secondNumber = frontValue;
  }
}

function processOperator(e) {
  if (checkErrors()) {
    return;
  }

  if (queueValue.slice(-1) === "=") {
    toResetQueueDisplay = false;
  }
  
  if (operatorList.some(operator => operator === queueValue.slice(-1)) && secondNumber) {
    getUpdateResult();
  }

  operator = e.target.id;

  queueValue = `${frontValue} ${operator}`;
  queueDisplay.textContent = queueValue;

  toResetFrontDisplay = true;
  secondNumber = null;
}

function processEquals(e) {
  if ((!(firstNumber && operator && secondNumber)) || (queueValue.slice(-1) === "=")) {
    return;
  }

  queueValue += ` ${frontValue} =`;
  queueDisplay.textContent = queueValue;

  getUpdateResult();

  toResetFrontDisplay = true;
  toResetQueueDisplay = true;
  secondNumber = null;
  operator = null;
}

function getUpdateResult() {
  if (checkErrors()) {
    return;
  }

  result = operate(operator, Number(firstNumber), Number(secondNumber));

  firstNumber = result;

  frontValue = result.toString();
  if (checkErrors()) {
    return;
  }
  frontDisplay.textContent = frontValue;
}

function checkErrors() {
  if (frontValue.toString().length > 11 || frontValue.includes("OVERFLOW")) {
    frontValue = "OVERFLOW";
    frontDisplay.textContent = frontValue;
    return true;
  }
  
  if (frontValue.includes("NOPE")) {
    frontValue = "NOPE";
    frontDisplay.textContent = frontValue;
    return true;
  }

  if (operator === "÷" && secondNumber === "0") {
    frontValue = "NOPE";
    frontDisplay.textContent = frontValue;
    return;
  }
}

function clear() {
  firstNumber = "0";
  secondNumber = null;
  operator = null;
  result = null;

  frontValue = "0";
  queueValue = "";
  frontDisplay.textContent = frontValue;
  queueDisplay.textContent = queueValue;

  toResetFrontDisplay = false;
  toResetQueueDisplay = false;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
  }
}

function add(a, b) {
  return Math.round((a + b) * 1000) / 1000;
}

function subtract(a, b) {
  return Math.round((a - b) * 1000) / 1000;
}

function multiply(a, b) {
  return Math.round((a * b) * 1000) / 1000;
}

function divide(a, b) {
  return Math.round((a / b) * 1000) / 1000;
}
