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
    case "×":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
      break;
    default:
      return "ERROR!";
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
    if (i === 1) {
      button.textContent = "⌫";
      button.dataset.type = "backspace";
    }
    // Generate digit buttons
    if (i > 1 && i < 11) {
      button.textContent = i - 1;
      button.dataset.type = "digit";
    }
    if (i === 11) {
      button.textContent = "0";
      button.dataset.type = "digit";
    }
    // Generate operator buttons and style them
    if (i > 11 || i === 0 || i === 1) {
      button.style.backgroundColor = "#FF9500";
    }
    if (i === 12) {
      button.textContent = "+";
      button.dataset.type = "operator";
    }
    if (i === 13) {
      button.textContent = "-";
      button.dataset.type = "operator";
    }
    if (i === 14) {
      button.textContent = "×";
      button.dataset.type = "operator";
    }
    if (i === 15) {
      button.textContent = "÷";
      button.dataset.type = "operator";
    }
    if (i === 16) {
      button.textContent = ".";
      button.dataset.type = "decimal";
    }
    if (i === 17) {
      //button.style.width = "233px";
      button.textContent = "=";
      button.dataset.type = "equals";
    }
    buttonContainer.appendChild(button);
  }
}

const calcContainer = document.getElementById("container");
const displayContainer = document.getElementById("display");
const buttonContainer = document.getElementById("buttons");

generateCalculatorButtons(18);

// Button functionality

const buttons = buttonContainer.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "AC") {
      // Clear the display and all variables
      displayContainer.value = "";
      firstNumber = "";
      operator = "";
      secondNumber = "";
      console.log(button.dataset.type); // Delete after
    } else if (operator.length === 0 && button.dataset.type === "digit") {
      // Update the firstNumber variable
      displayContainer.value += button.textContent;
      firstNumber += button.textContent;
      console.log(`First Number: ${firstNumber}`); // Delete after
    } else if (button.dataset.type === "operator") {
      // Only evaluate a pair of numbers at a time
      if (operator.length > 0) {
        operator += button.textContent;
        console.log(`Current operator: ${operator[operator.length - 2]}`); // Delete after
        firstNumber = operate(
          operator[operator.length - 2], // Here we need the previous/penultimate operator in the operator string
          firstNumber,
          secondNumber,
        );
        displayContainer.value = firstNumber;
        secondNumber = "";
      } else {
        operator += button.textContent;
      }

      console.log(`Operator: ${operator}`); // Delete after
    } else if (operator.length > 0 && button.dataset.type === "digit") {
      // Update the secondNumber variable
      displayContainer.value = secondNumber;
      displayContainer.value += button.textContent;
      secondNumber += button.textContent;
      console.log(`Second Number: ${secondNumber}`); // Delete after
    } else if (button.dataset.type === "equals") {
      console.log(
        `Current operation: ${firstNumber} ${operator[operator.length - 1]} ${secondNumber}`,
      ); // Delete after
      let operationResult = operate(
        operator[operator.length - 1], // Here we need the last operator in the operator string
        Number(firstNumber),
        Number(secondNumber),
      );
      displayContainer.value = "";
      displayContainer.value += operationResult;
      console.log(`Operation result: ${operationResult}`); // Delete after
    } else if (button.dataset.type === "decimal") {
      // Decimal support

      // Check if we're adding to the firstNumber or secondNumber and then update the variable and display
      if (firstNumber && !secondNumber && !firstNumber.includes(".")) {
        displayContainer.value += button.textContent;
        firstNumber += button.textContent;
        console.log(`First Number: ${firstNumber}`); // Delete after
      } else if (secondNumber && !secondNumber.includes(".")) {
        displayContainer.value += button.textContent;
        secondNumber += button.textContent;
        console.log(`Second Number: ${secondNumber}`); // Delete after
      }
    } else if (button.dataset.type === "backspace") {
      // Backspace support

      // Check if we're removing from firstNumber or secondNumber and then update the variable and display
      if (firstNumber && !secondNumber) {
        firstNumber = firstNumber.slice(0, -1); // Remove the last character
        displayContainer.value = firstNumber;
        console.log(`First Number: ${firstNumber}`); // Delete after
      } else if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1); // Remove the last character
        displayContainer.value = secondNumber;
        console.log(`Second Number: ${secondNumber}`);
      }
    }
  });
});
