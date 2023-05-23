let firstNumber = null;
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

let toResetFrontDisplay = false;
let toResetQueueDisplay = false;

function addNumber(e) {
  const number = e.target.id;

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

  if (checkOverflow()) {
    return;
  }
  frontDisplay.textContent = frontValue;

  if (!operator) {
    firstNumber = Number(frontValue);
  } else {
    secondNumber = Number(frontValue);
  }
}

function processOperator(e) {
  if (checkOverflow()) {
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
  result = operate(operator, firstNumber, secondNumber);

  firstNumber = result;

  frontValue = result.toString();
  if (checkOverflow()) {
    return;
  }
  frontDisplay.textContent = frontValue;
}

function checkOverflow() {
  if (frontValue.toString().length > 11 || frontValue.includes("OVERFLOW")) {
    frontValue = "OVERFLOW";
    frontDisplay.textContent = frontValue;
    return true;
  }
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
