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
    if (i > 0 && i < 10) {
      button.textContent = i;
      button.dataset.type = "digit";
    }
    if (i === 10) {
      button.textContent = "0";
      button.dataset.type = "digit";
    }
    if (i > 10 || i === 0) {
      button.style.backgroundColor = "#FF9500";
    }
    if (i === 11) {
      button.textContent = "+";
      button.dataset.type = "digit";
    }
    if (i === 12) {
      button.textContent = "-";
      button.dataset.type = "digit";
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
      button.style.width = `${buttonContainer.offsetWidth - 8}px `;
      button.textContent = "=";
      button.dataset.type = "equals";
    }
    buttonContainer.appendChild(button);
  }
}

const calcContainer = document.getElementById("container");
const displayContainer = document.getElementById("display");
const buttonContainer = document.getElementById("buttons");

generateCalculatorButtons(16);

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
    } else if (button.dataset.type === "operator" && operator.length === 0) {
      // Update the operator variable
      displayContainer.textContent += button.textContent;
      operator += button.textContent;
      console.log(`Operator: ${operator}`);
    } else if (operator.length > 0 && button.dataset.type === "digit") {
      // Update the secondNumber variable
      displayContainer.textContent += button.textContent;
      secondNumber += button.textContent;
      console.log(`Second Number: ${secondNumber}`);
    } else if (button.dataset.type === "equals") {
      let operationResult = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber),
      );
      displayContainer.textContent = "";
      displayContainer.textContent += operationResult;
      console.log(`Operation result: ${operationResult}`);
    }
  });
});
