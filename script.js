
function ClickedNum(event) {
    //Could convert to an int here and track integers
    //This leads to problems of dropping leading zeroes after a decimal place that should be displayed
    //instead, process the numbers as strings until we are ready to run operators on them
    //This should maintain leading zeroes.
    let temp = event.target.textContent;
    if (currentNum == null) {
        currentNum = temp;
        DisplayText();
        return;
    }
    //Concatenate numbers together rather than multiplying by ten and adding integers
    currentNum += temp;
    DisplayText();
}

function ClickedOp(event) {
    //console.log(`Current Number: ${currentNum} Previous Number: ${prevNum} Current Op: ${currentOp}`);
    // Square root immediately takes the root of whatever is on the screen
    if (event.target.textContent == '√') {
        if (currentNum != null) {
            currentNum = Math.sqrt(Number(currentNum)).toString();
            DisplayText();
            return;
        }
        else {
            prevNum = Math.sqrt(Number(prevNum)).toString();
            DisplayText();
            return;
        }
    }
    if (currentOp != null) {
        prevNum = EvaluateExpression(prevNum, currentNum, currentOp);
        currentOp = event.target.textContent;
        currentNum = null;
    }
    else {
        currentOp = event.target.textContent;
        prevNum = currentNum;
        currentNum = null;
    }
    DisplayText();
}

function ClickedClearAll(event) {
    currentNum = null;
    prevNum = null;
    currentOp = null;
    DisplayText();
}

function ClickedClear(event) {
    if (currentNum == null) {
        ClickedClearAll(event);
    }
    else {
        currentNum = currentNum.slice(0,-1);
    }
    DisplayText();
}

function ClickedPlusMinus(event) {
    currentNum = (0-Number(currentNum)).toString();
    DisplayText();
}

function ClickedEquals(event) {
    console.log(`Current Number: ${currentNum} Previous Number: ${prevNum} Current Op: ${currentOp}`);

    prevNum = EvaluateExpression(prevNum, currentNum, currentOp);
    currentNum = null;
    DisplayText();
}

function EvaluateExpression(num1, num2, op) {
    if (op == '+') {
        return (Number(num1) + Number(num2)).toString();;
    }
    else if (op == '-') {
        return (Number(num1) - Number(num2)).toString();
    }
    else if (op == 'x') {
        return (Number(num1) * Number(num2)).toString();
    }
    else if (op == '÷') {
        return (Number(num1) / Number(num2)).toString();
    }
}


function DisplayText() {
    if (currentNum != null) {
        screen.textContent = currentNum;
    }
    else {
        screen.textContent = prevNum;
    }
}

//Global Variables
let currentNum = null;
let prevNum = null;
let currentOp = null;

//DOM elements
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clearAll = document.querySelector('#clearAll');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals')
const plusMinus = document.querySelector('#plusMinus');

//Event Listeners
numButtons.forEach(item => { item.addEventListener('click', ClickedNum) })
opButtons.forEach(item => { item.addEventListener('click', ClickedOp) })
clearAll.addEventListener('click', ClickedClearAll);
clear.addEventListener('click', ClickedClear);

equals.addEventListener('click', ClickedEquals);
plusMinus.addEventListener('click', ClickedPlusMinus);

//Display startup
DisplayText();