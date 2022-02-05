/**
 * Event listener attached to numbers.
 * Concats the number being pressed to the string of the current number
 * Leaves numbers as strings to preserve leading zeros
 * 
 * 
 * @param {event} Event being clicked on 
 * @param {object} Current State of program
 * 
 */

function ClickedNum(event, currentState) {
    if (currentState.currentNum == null) currentState.currentNum = event.target.textContent;
    else currentState.currentNum += event.target.textContent;

    DisplayText(state);
}

/**
 * Event listener attached to operations.
 * Adds the currentNum to the nums list
 * Adds the operation being clicked to the ops list
 * Clears Current Num
 * 
 * @param {event} event 
 * @param {object} currentState
 */

function ClickedOp(event, currentState) {
    //If the last op pressed is a decimal, we can't have another decimal in until we see another op
    if ((currentState.ops[currentState.ops.length-1] == '.') && (event.target.textContent == '.')) {
        console.log('Cannot have more than one decimal per number');
        return;
    }

    //This will need to be changed when incorporation parens, or parens might not be an operator
    if (currentState.currentNum == null) {
        if (currentState.ops[currentState.ops.length - 1] == '.') {
            currentState.currentNum = '0';
        }
        else {
            console.log('Cannot use an operation with a null number');
            return;
        }
    }

    currentState.nums.push(currentState.currentNum);
    currentState.ops.push(event.target.textContent);
    currentState.currentNum = null;

    DisplayText(state);
}

/**
 * Clears the screen by setting state to default values
 * 
 * @param {object} currentState 
 */

function ClickedClearAll(event, currentState) {
    currentState.currentNum = null;
    currentState.nums = [];
    currentState.ops = [];

    DisplayText(state);
}

/**
 * Makes the current number negative
 * Handles decimal places by changing the number in front of the decimal negative instead
 * 
 * @param {object} currentState 
 */

function ClickedPlusMinus(event, currentState) {
    if(currentState.ops[currentState.ops.length-1] == '.') {
        let temp = 0 - Number(currentState.nums[currentState.nums.length-1]);
        currentState.nums[currentState.nums.length-1] = temp.toString();
    }
    else if (currentState.currentNum != null) {
        temp = 0 - Number(currentState.currentNum);
        currentState.currentNum = temp.toString();
    }

    DisplayText(currentState);
}

function DisplayText({nums, ops, currentNum}) {
    let temp = '';

    //This will have to be fixed at some point
    //Will not work with parens 
    for (let i = 0; i < nums.length; i++) {
        temp += nums[i];
        temp += ops[i];

    }
    if (currentNum != null) {
        temp += currentNum;
    }
    screen.textContent = temp;
}

//DOM elements
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals')
const plusMinus = document.querySelector('#plusMinus');

//Event Listeners
numButtons.forEach(item => { item.addEventListener('click', (event) => {ClickedNum(event, state)})});
opButtons.forEach(item => { item.addEventListener('click', (event) => {ClickedOp(event, state)})});
clear.addEventListener('click', (event) => {ClickedClearAll(event, state)});
plusMinus.addEventListener('click', (event) => {ClickedPlusMinus(event, state)});
//equals.addEventListener('click', ClickedEquals);

let state = {
    currentNum: null,
    nums: [],
    ops: []
}

DisplayText(state);