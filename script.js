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
    if (currentState.currentNum == null) {
        // Imply multiplication if a number is entered after a parenthesis
        if(currentState.ops[currentState.ops.length-1] == ')') {
            currentState.ops.push('x');
        }
        currentState.currentNum = event.target.textContent;
    }
    else currentState.currentNum += event.target.textContent;

    DisplayText(currentState);
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
    if ((currentState.ops[currentState.ops.length - 1] == '.') && (event.target.textContent == '.')) {
        console.log('Cannot have more than one decimal per number');
        return;
    }

    // Treat parens and non parens separately
    if (!(event.target.textContent == '(' || event.target.textContent == ')')) {
        // If the currentNum is null, we are either at the start, or just had an operator, and we can either set the currentNUm
        // to 0 if we just had a decimal, or ignore the input otherwise
        if (currentState.currentNum == null) {
            if (currentState.ops[currentState.ops.length - 1] == '.') {
                currentState.currentNum = '0';
            }
            else if (currentState.ops[currentState.ops.length-1] == ')') {
                currentState.ops.push(event.target.textContent);
                DisplayText(currentState);
                return;
            }
            else {
                console.log('Cannot use an operation with an  operator');
                return;
            }
        }
        // Will not push a null because we returned if currentNum is null, or set it to zero
        currentState.nums.push(currentState.currentNum);
        currentState.ops.push(event.target.textContent);
        currentState.currentNum = null;
        DisplayText(currentState);
        return;
    }
    else {
        // Assume multiplication if a number is next to a parenthesis
        // CurrentNum == null implies that the last button pressed is an op, not a number
        if (event.target.textContent == '(') {
            if (currentState.currentNum == null && currentState.ops[currentState.ops.length-1] == '.') {
                currentState.currentNum = 0;
            }
            if (currentState.currentNum != null) {
                currentState.ops.push('x');
                currentState.nums.push(currentState.currentNum);
                currentState.currentNum = null
            }
            currentState.ops.push('(');
            DisplayText(currentState);
            // currentNum is now null in all cases, and we have pushed a parens into the ops list.
        }
        else {
            if (currentState.currentNum == null) {
                if (currentState.ops[currentState.ops.length-1] == '.') {
                    currentState.currentNum == 0;
                }
                else {
                    console.log('Cannot end a parenthesis with an operator');
                    return;
                }
            }
            // Will not log a null because we returned or set it to zero
            currentState.nums.push(currentState.currentNum);
            currentState.ops.push(')');
            currentState.currentNum = null;
            DisplayText(currentState);
        }
    }
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


    DisplayText(currentState);
}

/**
 * Makes the current number negative
 * Handles decimal places by changing the number in front of the decimal negative instead
 * 
 * @param {object} currentState 
 */

function ClickedPlusMinus(event, currentState) {
    if (currentState.ops[currentState.ops.length - 1] == '.') {
        let temp = 0 - Number(currentState.nums[currentState.nums.length - 1]);
        currentState.nums[currentState.nums.length - 1] = temp.toString();
    }
    else if (currentState.currentNum != null) {
        temp = 0 - Number(currentState.currentNum);
        currentState.currentNum = temp.toString();
    }

    DisplayText(currentState);
}

/**
 * Stores the current state in the stateListm, and sets current state to blank.
 * 
 * @param {event} event 
 * @param {*} currentState 
 * @param {*} stateList 
 */

function ClickedLParen(event, currentState) {
    ClickedOp(event, currentState);
    /*
    let blank = {
        currentNum: null,
        nums: [],
        ops: []
    };
    stateList.push(blank);
    DisplayText(stateList);
    */
}

/**
 * Stores the current state as an entry in the nums list of the next most lowest state.
 * 
 * @param {*} event 
 * @param {*} currentState 
 * @param {*} stateList 
 * @returns 
 */

function ClickedRParen(event, currentState) {
    ClickedOp(event, currentState);
    /*
    let temp = stateList.splice(stateList.length-1, 1);
    console.log(temp);
    stateList[stateList.length-1].nums.push(temp);
    DisplayText(stateList);
    */
}

function ClickedEquals(event, currentState, stateList) {
    // Need to implement
    return;
}


// nums list will always be the same or shorter than the ops list. This is true because we only push numbers to the nums list 
// when an operator is added to the list at the same time
// Thus we can loop over the number list, and ensure that we never access past the end of the ops list
// Parenthesis will be added to the ops list, so these will make the list longer.
// An open parens will always come after an operator, either the operator press, or the implied multiplication
// A close parens will always come after a number
function DisplayText(state) {
    let temp = '';

    
    screen.textContent = DisplayTextHelper(state, temp);
    



//

    /*
    let temp = '';
    console.log(stateList);
    // Display everything in the stateList
    for (let i = 0; i < stateList.length; i++) {
        temp += '(';
        for (let j = 0; j < stateList[i].nums.length; j++) {
            if (typeof (stateList[i].nums[j]) == Object) {
                temp += '(';
                for (let k = 0; k < stateList[i].nums[j].length; k++) {
                    temp += stateList[i].nums[j].nums[k];
                    temp += stateList[i].nums[j].ops[k];
                }
                temp += stateList[i].nums[j].currentNum;
                temp += ')';
            }
            else {
                temp += stateList[i].nums[j];
                temp += stateList[i].ops[j];
            }
        }
        if (stateList[i].currentNum != null) {
            temp += stateList[i].currentNum;
        }
        temp += ')';
    }
    screen.textContent = temp;
    */
}

function DisplayTextHelper(state, text) {
    // This is where the bug is.
    // We can't get to zero length for nums, we are instead undefined.
    if (state.nums.length == 0) {
        if (state.currentNum != null)
            return text + state.currentNum;
        else
            return text;
    }
    [curOp, ...restOps] = state.ops;
    if (curOp == '(') {
        console.log('printing paren');
        return DisplayTextHelper({currentNum: state.currentNum, nums: state.nums, ops: restOps}, text + '(');
    }
    [curNum, ...restNums] = state.nums;
    text += curNum;
    if (curOp == ')') {
        return DisplayTextHelper({currentNum: state.currentNum, nums: restNums, ops: restOps}, text + ')');
    }
    text += curOp;
    return DisplayTextHelper({currentNum: state.currentNum, nums: restNums, ops: restOps}, text);
}

//DOM elements
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plusMinus');
const lParen = document.querySelector('#lParen');
const rParen = document.querySelector('#rParen');
const equals = document.querySelector('#equals');


//Event Listeners
numButtons.forEach(item => { item.addEventListener('click', (event) => { ClickedNum(event, state) }) });
opButtons.forEach(item => { item.addEventListener('click', (event) => { ClickedOp(event, state) }) });
clear.addEventListener('click', (event) => { ClickedClearAll(event, state) });
plusMinus.addEventListener('click', (event) => { ClickedPlusMinus(event, state) });
lParen.addEventListener('click', (event) => { ClickedLParen(event, state) });
rParen.addEventListener('click', (event) => { ClickedRParen(event, state) });
equals.addEventListener('click', (event) => { ClickedEquals(event, state) });

// Global Variables
let state = {
    currentNum: null,
    nums: [],
    ops: []
}


DisplayText(state);