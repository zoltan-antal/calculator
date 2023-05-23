let firstNumber = null;
let secondNumber = null;
let operator = null;

// const operatorList = ["+", "-", "×", "÷"];

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

function addNumber(e) {
  const number = e.target.id;

  if ((frontValue === "0" && number !== ".") || toResetFrontDisplay) {
    frontValue = "";
    toResetFrontDisplay = false;
  }

  if (!(number === "." && frontValue.includes("."))) {
    frontValue += number;
  }

  frontDisplay.textContent = frontValue;

  if (!operator) {
    firstNumber = Number(frontValue);
  } else {
    secondNumber = Number(frontValue);
  }
}

function processOperator(e) {
  operator = e.target.id;

  queueValue = `${frontValue} ${operator}`;
  queueDisplay.textContent = queueValue;

  toResetFrontDisplay = true;
}

function processEquals(e) {
  if (!(firstNumber && operator && secondNumber)) {
    return;
  }

  const result = operate(operator, firstNumber, secondNumber);
  firstNumber = result;

  frontValue = result.toString();
  frontDisplay.textContent = frontValue;
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
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return Math.round((a / b) * 1000) / 1000;
}
