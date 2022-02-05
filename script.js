// I figured out how to do parenthesis and dont want to forget
// When an opening parenthesis is pressed, a function stores the state in a list
// and then replaces it with a blank state.
// A closing parenthesis will then replace the state with the previous state in the list.
// Execution will execute the states from last to first

// Problems: This method doesn't allow for two sets of parenthesis.
// Potential solution: Do some more processing in the closing parenthesis step to execute what is in parens
// Potential solution: Have each state object contain a pointer to previous states, allowing more than one
// Chosen solution: Parens always evaluate to a number not an operator
// thus they can be listed in the numbers list.
// The numbers list can contain a number, in which case the next operator is applied to it.
// Or, it can contain a parens object, in which case the parens object must be executed

// opening a parenthesis creates a new state and stores it in a list
// as many states as needed can be created this way.
// A closing parens takes the current state and stores it as an entry in the nums list of the previous state
// the next button must be an operator other than . or +- (maybe)
// Can store the paren object in nums list, and stor 'paren' in teh currentNum
// This will let you filter for the special circumstance of ending in a parens, which will be special
// anyways because we will need to account for pressing enter before entering enough end parens





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