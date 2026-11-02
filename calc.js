// To implement: Add clear button functionality

const calculator = document.querySelector(".calculator__buttons");
const textBox = document.querySelector("#display");
const operators = "+-÷*";

calculator.addEventListener("click", (e) => {
    let num1 = null; 
    let num2 = null;
    let operator = null;
    let textArr = textBox.textContent.split("");
    let indexOfOp = findIndexOfOp(textArr);
    let operatorCount = countOperator(textArr);
    let hasOperator = indexOfOp !== -1;

    
    // set string value of numbers, and value of operator
    if (hasOperator) {
        operator = textArr[indexOfOp];
        num1 = textArr.slice(0, indexOfOp).join("");
        num2 = textArr.slice(indexOfOp+1).join("");
    }

    // updates display with clicked number
    updateDisplay(e, "number");

    // only allow decimal once per num (done by checking each side of operator)
    if (!(hasDecimal(textBox.textContent)) || (!hasDecimal(num2) && hasOperator)) {
        updateDisplay(e, "dot");
    }
    
    // only allow an operator if textbox bot empty and operator < 1
    if (textBox.textContent != "" && operatorCount < 1) {
        updateDisplay(e, "operator");
    }

    // if operator clicked and already operator in textbox, evaluate first then add new operator to display
    if (e.target.classList.contains("operator") && num1 !== null && num2 !== null && hasOperator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        const output = operate(num1, num2, operator);
        updateDisplay(output);
        updateDisplay(e, "operator");
    }

    // if equal clicked and have all variables, calculate and update display
    if (e.target.classList.contains("enter")){
        if (num1 !== null && num2 !== null && hasOperator){
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        const output = operate(num1, num2, operator);
        updateDisplay(output);
        }
    }

    if (e.target.id == "all-clear") {
        updateDisplay("");
    }

    //console logging
    textArr = textBox.textContent.split("");
    indexOfOp = findIndexOfOp(textArr);
    operatorCount = countOperator(textArr);
    hasOperator = indexOfOp !== -1;
    console.log(`--------------------------------`);
    console.log(`Text Array: ${textArr}`);
    console.log(`Num1: ${num1}, Num2: ${num2}`);
    console.log(`Has Operator: ${hasOperator}, Operator: ${operator}, Operator Index: ${indexOfOp}`);
});

function findIndexOfOp(arr){
    return arr.findIndex(
        (char, index) => index > 0 && operators.includes(char) // exclude initial "-" sign
    );
}

function countOperator(arr){
     return arr.filter(
        (char, index) => index > 0 && operators.includes(char) // exclude initial "-" sign
    ).length; 
}

function hasDecimal(str) {
    if (str === null) return false;
    return str
            .split("")
            .some(char => char === '.');
}

function updateDisplay(output, className){

    if(typeof(output) === "object") {
        if (output.target.classList.contains(className)) {
            if (output.target.textContent === "x") {
            textBox.textContent += "*";
            }
            else{
                textBox.textContent += event.target.textContent;
            }
        }
        textBox.scrollLeft = textBox.scrollWidth;  
    }
    else if(typeof(output) === "number" || typeof(output) === "string"){
        textBox.textContent = output;
    }

}

function operate(num1, num2, operator){
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "÷":
            return num1 / num2;
    }
}

