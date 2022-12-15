let clearScreen =  false;
let incompleteCalc = false
const currentValueDisplay = document.querySelector(".currentCalc");
const previousValueDisplay = document.querySelector(".previousCalc");
const numberButtons = document.querySelectorAll(".numButton");
const operatorButtons = document.querySelectorAll(".opsButton");
const clearButton = document.querySelector(".clearButton");
const deleteButton = document.querySelector(".deleteButton");
const equalsButton = document.querySelector(".equalsButton");

const operation = {a: null, b: null, operator: null};

function add(a, b) {
	return Number(a) + Number(b);
};

function subtract(a, b) {
	return Number(a) - Number(b);
};

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function operate(a, b, operator) {
    if (operator == "+") {
        return add(a, b);
    }
    else if (operator == "-") {
        return subtract(a, b);
    }
    else if (operator == "x") {
        return multiply(a, b);
    }
    else if (operator == "%") {
        if (a == 0 || b == 0) {
            clearScreen = true;
            return "Doesn't compute";
        } else {
            return divide(a, b);
        }
    }
}

clearButton.addEventListener('click', () => {
    currentValueDisplay.textContent = "0";
    previousValueDisplay.textContent =  "";
    operation.a = null;
    operation.b = null;
    operation.operator = null;
})

deleteButton.addEventListener('click', () => {
    if (currentValueDisplay.textContent.length == 1) {
        if (!(currentValueDisplay.textContent == "0")) {
            currentValueDisplay.textContent = "0";
        }
    } else {
        currentValueDisplay.textContent = 
            currentValueDisplay.textContent.slice(0, -1);
    }
})

equalsButton.addEventListener('click', () => finalEquals())

for (const button of numberButtons) {
    button.addEventListener('click', () => displayNumber(button.textContent))
};

for (const button of operatorButtons) {
    button.addEventListener('click', () => setOperation(button.textContent))
};

function displayNumber(aNumber) {
    if (currentValueDisplay.textContent == "0" || clearScreen) {
        currentValueDisplay.textContent = aNumber
        clearScreen = false;
    } else {
        currentValueDisplay.textContent += aNumber;
    }
}

//12 + 7 - 5 * 3 = 42

function setOperation(anOperator) {
    if (operation.a == null) {
    operation.a = currentValueDisplay.textContent;
    operation.operator = anOperator;
    previousValueDisplay.textContent = operation.a + " " + operation.operator;
    clearScreen = true;
    } else {
        completeOperation(anOperator);
        if (currentValueDisplay.textContent == "Doesn't compute") {
            previousValueDisplay.textContent = "";
            operation.a = null;
            operation.b = null;
            operation.operator = null;
            clearScreen = true;
        } else {
            previousValueDisplay.textContent = operation.a + " " + operation.operator;
            clearScreen = true;
        }
    }
}

function completeOperation(anOperator) {
    operation.b = currentValueDisplay.textContent;
    currentValueDisplay.textContent = roundResult(operate(operation.a, operation.b, operation.operator));
    operation.a = currentValueDisplay.textContent;
    operation.b = null;
    operation.operator = anOperator;
}

function finalEquals() {
    if (operation.a == null || operation.operator == null) {
        return;
    } else {
        operation.b = currentValueDisplay.textContent
        previousValueDisplay.textContent = operation.a + " " + operation.operator + " " + operation.b + " =";
        currentValueDisplay.textContent = roundResult(operate(operation.a, operation.b, operation.operator));
        operation.a = null;
        operation.b = null;
        operation.operator = null;
        clearScreen =  true;
        if (currentValueDisplay.textContent == "Doesn't compute") {
            previousValueDisplay.textContent = "";
        }
    }
}

function roundResult(a) {
    if (a == "Doesn't compute") {
        return a;
    } else {
        return Math.round(a * 1000) / 1000;
    }
    
}
