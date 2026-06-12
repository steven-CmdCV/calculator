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
    case "*":
    case "×":
      return multiply(a, b);
      break;
    case "/":
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
      button.textContent = "=";
      button.dataset.type = "equals";
    }
    buttonContainer.appendChild(button);
  }
}

// Handle button/key functions
function handleClear() {
  // Clear the display and all variables
  displayContainer.value = "";
  firstNumber = "";
  operator = "";
  secondNumber = "";
}

function handleOperator(value) {
  if (!firstNumber) return; // Make sure user inputs a number before an operator

  // Only evaluate a pair of numbers at a time
  if (operator.length > 0) {
    operator += value;
    firstNumber = operate(
      operator[operator.length - 2], // Here we need the previous/penultimate operator in the operator string
      firstNumber,
      secondNumber,
    );
    displayContainer.value = firstNumber;
    secondNumber = "";
  } else {
    operator += value;
  }
}

function handleDigit(value) {
  if (operator.length === 0) {
    // Update the firstNumber variable
    displayContainer.value += value;
    firstNumber += value;
  } else if (operator.length > 0) {
    // Update the secondNumber variable
    displayContainer.value = secondNumber;
    displayContainer.value += value;
    secondNumber += value;
  }
}

function handleDecimal(value) {
  // Check if we're adding the decimal to the firstNumber or secondNumber
  // and then update the variable and display
  if (firstNumber && !secondNumber && !firstNumber.includes(".")) {
    displayContainer.value += value;
    firstNumber += value;
  } else if (secondNumber && !secondNumber.includes(".")) {
    displayContainer.value += value;
    secondNumber += value;
  }
}

function handleBackspace() {
  // Check if we're removing from firstNumber or secondNumber
  // and then update the variable and display
  if (firstNumber && !secondNumber) {
    // Clear the firstNumber and operator to prevent
    // issues with later operations
    firstNumber = "";
    operator = "";
    displayContainer.value = firstNumber;
  } else if (secondNumber) {
    secondNumber = "";
    displayContainer.value = secondNumber;
  }
}

function handleEquals() {
  let operationResult = operate(
    operator[operator.length - 1], // Here we need the last operator in the operator string
    Number(firstNumber),
    Number(secondNumber),
  );

  displayContainer.value = "";
  displayContainer.value += operationResult;
  firstNumber = operationResult;
  secondNumber = "";
}

function isDigit(value) {
  return value >= "0" && value <= "9";
}

const calcContainer = document.getElementById("container");
const displayContainer = document.getElementById("display");
const buttonContainer = document.getElementById("buttons");

generateCalculatorButtons(18);

// Button Support
const buttons = buttonContainer.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.type) {
      case "clear":
        handleClear();
        break;
      case "digit":
        handleDigit(button.textContent);
        break;
      case "operator":
        handleOperator(button.textContent);
        break;
      case "equals":
        handleEquals();
        break;
      case "decimal":
        handleDecimal(button.textContent);
        break;
      case "backspace":
        handleBackspace();
        break;
      default:
        return;
    }
  });
});

// Keyboard Support
displayContainer.addEventListener("keydown", (event) => {
  const operatorArray = ["+", "-", "*", "/"];

  // Reject invalid keys
  if (
    !isDigit(event.key) &&
    !operatorArray.includes(event.key) &&
    event.key != "Backspace" &&
    event.key != "Enter" &&
    event.key != "=" &&
    event.key != "."
  ) {
    event.preventDefault();
    return;
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    handleBackspace();
  } else if (isDigit(event.key)) {
    event.preventDefault();
    handleDigit(event.key);
  } else if (operatorArray.includes(event.key)) {
    event.preventDefault();
    handleOperator(event.key);
  } else if (event.key === "=" || event.key === "Enter") {
    event.preventDefault();
    handleEquals();
  } else if (event.key === ".") {
    event.preventDefault();
    handleDecimal(event.key);
  }
});

// Hover effect for buttons
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#000000";
  });

  button.addEventListener("mouseleave", () => {
    switch (button.dataset.type) {
      case "clear":
      case "backspace":
      case "operator":
      case "equals":
      case "decimal":
        button.style.backgroundColor = "#FF9500";
        break;
      case "digit":
        button.style.backgroundColor = "#2d2d44";
        break;
      default:
        return;
    }
  });
});
