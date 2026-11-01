// have user type entire expression (num, operator, num)
    // - only number buttons enabled first (default), "." not a number
    // - if textBox not empty (will be atleast 1 num, 1 dot), allow operator button
    // - if operator exists, disable operator and enable dot again (just one) 

    // always allow number
    // only allow operator if number already in textbox & no existing operator
    // only allow decimal if no decimal (works for both num1 and num2) 
    // OR if there is operator, only allow decimal if there is no decimal in num2

// make sure it is typed only in this order (num, operator, num)
// listen for equal button click, parse textbox value
// perform operation
// display result in text box

const calculator = document.querySelector(".button-container");
const textBox = document.querySelector('input[type="text"]');
const operators = "+-÷*";

calculator.addEventListener("click", (e) => {
    let num1 = null; 
    let num2 = null;
    let indexOfOp = null; // maybe keep inside set string value block if not used outside of it
    let textArr = textBox.value.split("");
    let hasOperator = textArr.some(char => operators.includes(char));
    
    // set string value of numbers
    if (hasOperator) {
        indexOfOp = textArr.findIndex(char => operators.includes(char));
        num1 = textArr.slice(0, indexOfOp).join("");
        if ((textArr.length-1) > indexOfOp){
            num2 = textArr.slice(indexOfOp+1).join("");
        }
    }

    // updates display with clicked number
    updateDisplay(e, "number");

    // only allow decimal once per num (done by checking each side of operator)
    if (!(hasDecimal(textBox.value)) || (!hasDecimal(num2) && hasOperator)) {
        updateDisplay(e, "dot");
    }
    
    // only allow first operator if number already in textbox, dont allow second operator
    if (textBox.value != "" && !hasOperator) {
        updateDisplay(e, "operator");
    }

    // if operator clicked and already operator in textbox, evaluate first then add new operator


    ////console logging////
    textArr = textBox.value.split("");
    hasOperator = textArr.some(char => operators.includes(char));
    console.log(textArr);
    console.log("Operator: ", hasOperator);
    console.log("Decimal: ", hasDecimal(textBox.value));
    console.log(`Num1: ${num1}, Num2: ${num2}`);
    ///////////////////////
});

function hasDecimal(str) {
    if (str === null) return false;
    return str
            .split("")
            .some(char => char === '.');
}

function updateDisplay(event, className){
    if (event.target.classList.contains(className)) {
            if (event.target.textContent === "x") {
            textBox.value += "*";
            }
            else{
                textBox.value += event.target.textContent;
            }
        }
}

function parseText(){

}

function operate(num1, num2, operator){

}

