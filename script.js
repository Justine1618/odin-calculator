
//Only handle integers for now, will deal with floats later
function ClickedNum(event) {
    let temp = parseInt(event.target.textContent);
    currentNum *= 10;
    currentNum += temp;
    DisplayText();
}

function ClickedOp(event) {
    //Can only add an op if there is a number for it to act on
    //This breaks parenthesis, but they will be handled specially anyways
    if (currentNum != 0) {
        nums.push(currentNum);
    }
    currentNum = 0;
    ops.push(event.target.textContent);
    DisplayText();
}

function ClearAll(event) {
    nums = [];
    ops = [];
    currentNum = 0;
    DisplayText();
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
    if (currentNum != 0) {
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

numButtons.forEach(item => { item.addEventListener('click', ClickedNum) })
opButtons.forEach(item => { item.addEventListener('click', ClickedOp) })
clear.addEventListener('click', ClearAll);

DisplayText();