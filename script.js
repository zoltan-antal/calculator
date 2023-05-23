let firstNumber;
let secondNumber;
let operation;

let displayValue = "0";
const resultDisplay = document.querySelector("#result");
const queueDisplay = document.querySelector("#queue");
resultDisplay.textContent = displayValue;

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", addNumber));

function addNumber(e) {
  if (displayValue === "0" && e.target.id !== ".") {
    displayValue = "";
  }

  if (!(e.target.id === "." && displayValue.includes("."))) {
    displayValue += e.target.id;
  }

  resultDisplay.textContent = displayValue;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
      break;
    case "-":
      return subtract(firstNumber, secondNumber);
      break;
    case "*":
      return multiply(firstNumber, secondNumber);
      break;
    case "/":
      return divide(firstNumber, secondNumber);
      break;
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
