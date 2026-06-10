// Operator functions

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (b === 0) return "ERROR!";
  return (Number(a) / Number(b)).toFixed(4);
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "x":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
      break;
    default:
      return "Please choose a valid operator";
  }
}

// Calculator buttons

function generateCalculatorButtons(n) {
  for (let i = 0; i < n; i++) {
    const button = document.createElement("button");
    if (i === 0) {
      button.textContent = "AC";
      button.dataset.type = "clear";
    }
    // Generate digit buttons
    if (i > 0 && i < 10) {
      button.textContent = i;
      button.dataset.type = "digit";
    }
    if (i === 10) {
      button.textContent = "0";
      button.dataset.type = "digit";
    }
    // Generate operator buttons and style them
    if (i > 10 || i === 0) {
      button.style.backgroundColor = "#FF9500";
    }
    if (i === 11) {
      button.textContent = "+";
      button.dataset.type = "operator";
    }
    if (i === 12) {
      button.textContent = "-";
      button.dataset.type = "operator";
    }
    if (i === 13) {
      button.textContent = "x";
      button.dataset.type = "operator";
    }
    if (i === 14) {
      button.textContent = "÷";
      button.dataset.type = "operator";
    }
    if (i === 15) {
      button.textContent = ".";
      button.dataset.type = "decimal";
    }
    if (i === 16) {
      button.style.width = "233px";
      button.textContent = "=";
      button.dataset.type = "equals";
    }
    buttonContainer.appendChild(button);
  }
}

const calcContainer = document.getElementById("container");
const displayContainer = document.getElementById("display");
const buttonContainer = document.getElementById("buttons");

generateCalculatorButtons(17);

// Button functionality

const buttons = buttonContainer.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "AC") {
      // Clear the display and all variables
      displayContainer.textContent = "";
      firstNumber = "";
      operator = "";
      secondNumber = "";
      console.log(button.dataset.type);
    } else if (operator.length === 0 && button.dataset.type === "digit") {
      // Update the firstNumber variable
      displayContainer.textContent += button.textContent;
      firstNumber += button.textContent;
      console.log(`First Number: ${firstNumber}`);
    } else if (button.dataset.type === "operator") {
      // Only evaluate a pair of numbers at a time
      if (operator.length > 0) {
        operator += button.textContent;
        console.log(`Current operator: ${operator[operator.length - 2]}`);
        firstNumber = operate(
          operator[operator.length - 2], // Here we need the previous/penultimate operator in the operator string
          firstNumber,
          secondNumber,
        );
        displayContainer.textContent = firstNumber;
        secondNumber = "";
      } else {
        operator += button.textContent;
      }

      console.log(`Operator: ${operator}`);
    } else if (operator.length > 0 && button.dataset.type === "digit") {
      // Update the secondNumber variable
      displayContainer.textContent = "";
      displayContainer.textContent += button.textContent;
      secondNumber += button.textContent;
      console.log(`Second Number: ${secondNumber}`);
    } else if (button.dataset.type === "equals") {
      console.log(
        `Current operation: ${firstNumber} ${operator} ${secondNumber}`,
      );
      let operationResult = operate(
        operator[operator.length - 1], // Here we need the last operator in the operator string
        Number(firstNumber),
        Number(secondNumber),
      );
      displayContainer.textContent = "";
      displayContainer.textContent += operationResult;
      console.log(`Operation result: ${operationResult}`);
    }
  });
});
