function ClickedSymbol(event, state) {
    state.text += event.target.textContent;
    DisplayText(state);

}

function DisplayText(state) {
    screen.textContent = state.text;
}

function ClickedClearAll(event, state) {
    state.text = '';
    DisplayText(state);
}


function ClickedEquals(event, state) {
    return;
}

function ProcessNumbers(state) {
    let list = [];
    for (let i = 0; i < state.text.length; i++) {
        if (Number.isInteger(Number(state.text[i]))) {
            if (Number.isInteger(list[list.length-1])) {
                list[list.length-1] *= 10;
                list[list.length-1] += Number(state.text[i]);
            }
            else {
                list.push(Number(state.text[i]));
            }
        }
        else {
            list.push(state.text[i]);
        }
    }
    return list;
}

//DOM elements
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');


//Event Listeners
numButtons.forEach(item => { item.addEventListener('click', (event) => { ClickedSymbol(event, state) }) });
opButtons.forEach(item => { item.addEventListener('click', (event) => { ClickedSymbol(event, state) }) });
clear.addEventListener('click', (event) => { ClickedClearAll(event, state) });
equals.addEventListener('click', (event) => { ClickedEquals(event, state) });

// Global Variables
let state = { text: '' };


DisplayText(state);