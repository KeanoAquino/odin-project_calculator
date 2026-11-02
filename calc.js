
const calculator = document.querySelector(".calculator__buttons");
const textBox = document.querySelector("#display");
const operators = "+-÷*";
let answer = false;

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
        updateDisplay(e, "dot", hasOperator);
    }
    
    // only allow an operator if textbox box empty and operator < 1
    if (textBox.textContent != "" && operatorCount < 1) {
        updateDisplay(e, "operator", hasOperator);
    }

    // if operator clicked and already operator in textbox, evaluate first then add new operator to display
    if (
        e.target.classList.contains("operator") && 
        num1 !== null && 
        num2 !== null &&
        !Number.isNaN(parseFloat(num1)) &&
        !Number.isNaN(parseFloat(num2)) &&
        hasOperator && 
        !operators.includes(textArr[textArr.length-1])
    ) {
        num1 = parseFloat(addLeadingZero(num1));
        num2 = parseFloat(addLeadingZero(num2));
        const output = operate(num1, num2, operator);
        updateDisplay(output);
        updateDisplay(e, "operator"); //calculate then append new operator
    }

    // if equal clicked and have all variables, calculate and update display
    if (e.target.classList.contains("enter")){
        if (
            num1 !== null && 
            num2 !== null &&
            !Number.isNaN(parseFloat(num1)) &&
            !Number.isNaN(parseFloat(num2)) &&
            hasOperator
        ){
        num1 = parseFloat(addLeadingZero(num1));
        num2 = parseFloat(addLeadingZero(num2));
        const output = operate(num1, num2, operator);
        updateDisplay(output);
        }
        answer = true;
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
    console.log(`Answer: ${answer}`);
});

function addLeadingZero(str){
    let arr = str.split("");
    if (arr[0] === "."){
        arr.unshift("0");
    }
    console.log(arr.join(""));
    return arr.join("");
    
}

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

function updateDisplay(output, className, hasOperator){
    if(typeof(output) === "object") {
        if (output.target.classList.contains(className)) {
            if (answer === true && 
                !hasOperator && 
                (output.target.classList.contains("number") || output.target.classList.contains("dot"))
            ){
                updateDisplay("");
                answer = false;
            }
            if (output.target.textContent === "x") {
            textBox.textContent += "*";
            }
            else{
                textBox.textContent += output.target.textContent;
            }
        }
        textBox.scrollLeft = textBox.scrollWidth;  
    }
    else if(typeof(output) === "number" || typeof(output) === "string"){
        textBox.textContent = output;
    }

}

function operate(num1, num2, operator){
    if (num2 === 0 && operator === "÷") return "Cannot divide by zero!";
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

