
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
    //Can only add an op if there is a number for it to act on
    //This breaks parenthesis, but they will be handled specially anyways
    //However, it correctly displays and error if more than one operator is pressed in a row
    if (ops[ops.length - 1] == ".") {

        if (event.target.textContent == ".") {
            screen.textContent = 'Error, cannot have more than one decimal per number';
            return;
        }
    }
    if (currentNum != null) {
        nums.push(currentNum);
    }
    currentNum = null;
    ops.push(event.target.textContent);
    DisplayText();
}

function ClickedClearAll(event) {
    nums = [];
    ops = [];
    currentNum = null;
    DisplayText();
}

function ClickedPlusMinus(event) {
    //If the previos operator is a decimal, we want to change the sign of the whole number part and 
    //leave the decimal part alone
    if (ops[ops.length - 1] == ".") {
        nums[nums.length - 1] = 0 - nums[nums.length - 1];
    }
    else if (currentNum != null) {
        currentNum = 0 - Number(currentNum);
    }
    DisplayText();
}

//The equals button should scan the current lest of numbers and operations, applying ops to the numbers
//At the same index, and at index +1. Numbers will be replaced with the result and op will be removed
//Numbers and ops are stored as strings, so conversion will be necessary
//Order of operations will be maintained by checking the list of ops in order of priority
//Order of Ops
//Decimal Op - Create a floating point number out of two integers with decimal between
//Parenthesis - Haven't figured this out yet
//Multiplication and Division
//Addition and Substraction
function ClickedEquals(event) {
    //Don't want to throw an error for ending on a decimal, just add an invisible 0
    if (currentNum == null) {
        if (ops[ops.length - 1] == ".") {
            currentNum = '0';
        }
        else {
            screen.textContent = 'Syntax Error, expression must end in a number';
            return;
        }
    }
    nums.push(currentNum);
    let result = evaluateExpression(nums, ops);
    if (result == null) {
        screen.textContent = "Error, unable to compute expression";
        return;
    }
    ops = [];
    nums = [];
    currentNum = result;
    DisplayText();
    return;

}

function evaluateExpression(currentNums, currentOps) {
    //Nums is one longer than ops, stop early
    if (currentOps.length == 0) {
        return currentNums;
    }

    //This pursposefully has a for loop for each operator. This maintains order of operations.
    //looping backwards because the function removes items from the list
    for (let i = currentOps.length - 1; i >= 0; i--) {
        if (currentOps[i] == '.') {
            currentNums.splice(i, 2, decimalOp(currentNums[i], currentNums[i + 1]));
            currentOps.splice(i, 1);
        }
    }

    for (let i = currentOps.length - 1; i >= 0; i--) {
        if (currentOps[i] == 'x') {
            currentNums.splice(i, 2, multOp(currentNums[i], currentNums[i + 1]));
            currentOps.splice(i, 1);
        }
    }

    for (let i = currentOps.length - 1; i >= 0; i--) {
        //I copied and pasted the divide symbol from the console.
        if (currentOps[i] == "÷") {
            currentNums.splice(i, 2, divOp(currentNums[i], currentNums[i + 1]));
            currentOps.splice(i, 1);
        }
    }

    for (let i = currentOps.length - 1; i >= 0; i--) {
        if (currentOps[i] == '+') {
            currentNums.splice(i, 2, addOp(currentNums[i], currentNums[i + 1]));
            currentOps.splice(i, 1);
        }
    }

    for (let i = currentOps.length - 1; i >= 0; i--) {
        if (currentOps[i] == '-') {
            currentNums.splice(i, 2, subOp(currentNums[i], currentNums[i + 1]));
            currentOps.splice(i, 1);
        }
    }

    if (currentNums.length != 1) {
        console.log("Incorrect evaluation, more than one number entry remaining");
        return null;
    }

    return currentNums[0];

}

//Each operation will be take two strings of integers, or floats. It wll return a float

//might only pass strings into the decimal op, because that is the only one that needs to preserve leading zeroes.
function decimalOp(a, b) {
    //We save the length of the decimal part so that we can divide by the proper power of ten to put the decimal in the correct place
    //This will preserve leading zeroes that will be lost upoon conversion to a number instead of a string

    //We can't just add the decimal part, we need to do the same as the sign of the whole number
    //This prevents wrong arithmatic with negative numbers
    let decimalLength = -b.length;
    if (Number(a) >= 0) {
        return Number(a) + Number(b) * (10 ** decimalLength);
    }
    else {
        return Number(a) - Number(b) * (10 ** decimalLength);
    }
}

function multOp(a, b) {
    return Number(a) * Number(b);
}

function divOp(a, b) {
    return Number(a) / Number(b);
}

function addOp(a, b) {
    return Number(a) + Number(b);
}

function subOp(a, b) {
    return Number(a) - Number(b);
}

function DisplayText() {
    let temp = ''
    if (nums.length != ops.length) {
        if (nums.length == 0) {
            screen.textContent = 'Error, expression must start with a number';
            return;
        }
        screen.textContent = 'Error, expression cannot contain consecutive operators';
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        temp += nums[i];
        temp += ops[i];

    }
    if (currentNum != null) {
        temp += currentNum;
    }
    screen.textContent = temp;
}

//Global Variables
let currentNum = null;
let nums = [];
let ops = [];

//DOM elements
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals')
const plusMinus = document.querySelector('#plusMinus');

//Event Listeners
numButtons.forEach(item => { item.addEventListener('click', ClickedNum) })
opButtons.forEach(item => { item.addEventListener('click', ClickedOp) })
clear.addEventListener('click', ClickedClearAll);
equals.addEventListener('click', ClickedEquals);
plusMinus.addEventListener('click', ClickedPlusMinus);

//Display startup
DisplayText();