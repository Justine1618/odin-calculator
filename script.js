
//Only handle integers for now, will deal with floats later
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
    //Adding two decimal operators to a single number should throw an error, but currently does not. Can check during op evaluation
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
    if (currentNum == null) {
        screen.textContent = 'Syntax Error, expression must end in a number';
        return;
    }

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
        temp += ' ';
        temp += ops[i];
        temp += ' ';
    }
    if (currentNum != null) {
        temp += currentNum;
    }
    screen.textContent = temp;
}

let currentNum = null;
let nums = [];
let ops = [];


const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals')

numButtons.forEach(item => { item.addEventListener('click', ClickedNum) })
opButtons.forEach(item => { item.addEventListener('click', ClickedOp) })
clear.addEventListener('click', ClickedClearAll);
equals.addEventListener('click', ClickedEquals);

DisplayText();