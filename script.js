
//Only handle integers for now, will deal with floats later
function ClickedNum(event) {
    let temp = parseInt(event.target.textContent);
    if (currentNum == null) {
        currentNum = temp;
        DisplayText();
        return;
    }
    currentNum *= 10;
    currentNum += temp;
    DisplayText();
}

function ClickedOp(event) {
    //Can only add an op if there is a number for it to act on
    //This breaks parenthesis, but they will be handled specially anyways
    //However, it correctly displays and error if more than one operator is pressed in a row
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

function ClickedEquals(event) {
    
}

function DisplayText() {
    let temp = ''
    if (nums.length != ops.length) {
        console.log("Length of numberlist and length of operationlist do not match");
        screen.textContent = 'Error';
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        temp += nums[i].toString();
        temp += ' ';
        temp += ops[i];
        temp += ' ';
    }
    if (currentNum != null) {
        temp += currentNum.toString();
    }
    screen.textContent = temp;
}

let currentNum = 0;
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