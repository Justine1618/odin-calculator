function Clicked() {
    screenText += "Clicked a button";
    screen.textContent = screenText;
}

let screenText = '';

const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');

const nine = document.querySelector('#nine');

nine.addEventListener('click', Clicked);