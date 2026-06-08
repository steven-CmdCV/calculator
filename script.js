// Operator functions

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
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "x":
      multiply(a, b);
      break;
    case "÷":
      divide(a, b);
      break;
    default:
      return "Please choose a valid operator";
  }
}

// Calculator buttons

function generateCalculatorButtons(n) {
  for (let i = 0; i < n; i++) {
    const button = document.createElement("button");
    if (i === 0) button.textContent = "AC";
    if (i > 0 && i < 10) button.textContent = i;
    if (i === 10) button.textContent = 0;
    if (i > 10 || i === 0) button.style.backgroundColor = "#FF9500";
    if (i === 11) button.textContent = "+";
    if (i === 12) button.textContent = "-";
    if (i === 13) button.textContent = "x";
    if (i === 14) button.textContent = "÷";
    if (i === 15) button.textContent = "=";
    if (i === 15) button.style.width = `${buttonContainer.offsetWidth - 10}px `;
    buttonContainer.appendChild(button);
  }
}

const calcContainer = document.getElementById("container");
const displayContainer = document.getElementById("display");
const buttonContainer = document.getElementById("buttons");

generateCalculatorButtons(16);
