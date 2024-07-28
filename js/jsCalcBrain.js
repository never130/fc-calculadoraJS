let trailingResult = 0;
let operationOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";
let lastInput = ""; // Para rastrear la última entrada

function updateDisplay(input) {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");

  // Si se ingresa un número o un decimal al principio
  if (display.innerHTML === "0" && operationOptions.indexOf(input) === -1) {
    if (input === "decimal") {
      display.innerHTML = "0.";
    } else if (input === "negative-value") {
      display.innerHTML = "-" + display.innerHTML;
    } else {
      display.innerHTML = input;
    }
  } 
  // Manejo de operadores
  else if (operationOptions.indexOf(input) >= 0) {
    if (lastInput === "negative-value") {
      // Si el último input fue un signo negativo, lo dejamos como está
      display.innerHTML = "-" + display.innerHTML;
    } else if (lastInput && operationOptions.indexOf(lastInput) >= 0) {
      // Reemplazar el operador si el anterior también fue un operador
      workingOperation = input;
    } else if (workingOperation === "") {
      // Primer operador después de un número
      workingOperation = input;
      trailingResult = display.innerHTML;
      secondaryDisplay.innerHTML = trailingResult;
      display.innerHTML = 0;
    } else {
      // Operación ya establecida, realizar cálculo
      trailingResult = calculate(trailingResult, display.innerHTML, workingOperation);
      secondaryDisplay.innerHTML = trailingResult;
      display.innerHTML = 0;
      workingOperation = input;
    }
  } 
  // Manejo del botón de igual
  else if (input === "equals") {
    display.innerHTML = calculate(trailingResult, display.innerHTML, workingOperation);
    trailingResult = 0;
    workingOperation = "";
    secondaryDisplay.innerHTML = trailingResult;
  } 
  // Manejo del decimal
  else if (input === "decimal") {
    if (display.innerHTML.indexOf(".") === -1) {
      display.innerHTML += ".";
    }
  } 
  // Manejo del signo negativo
  else if (input === "negative-value") {
    if (display.innerHTML.startsWith("-")) {
      display.innerHTML = display.innerHTML.slice(1);
    } else {
      display.innerHTML = "-" + display.innerHTML;
    }
  } 
  // Entrada de números
  else {
    if (display.innerHTML === "0") {
      display.innerHTML = input;
    } else {
      display.innerHTML += input;
    }
  }

  lastInput = input; // Actualizar la última entrada
}

function clearDisplay() {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");
  trailingResult = 0;
  display.innerHTML = 0;
  secondaryDisplay.innerHTML = trailingResult;
  workingOperation = ""; // Restablecer la operación en proceso
  lastInput = ""; // Restablecer la última entrada
}

function calculate(firstNumber, secondNumber, operation) {
  let result;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  switch(operation) {
    case "add":
      result = firstNumber + secondNumber;
      break;
    case "subtract":
      result = firstNumber - secondNumber;
      break;
    case "multiply":
      result = firstNumber * secondNumber;
      break;
    case "divide":
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Calculate switch statement missed something");
  }
  return result.toString();
}