function Clicked(event) {
    screenText += event.target.textContent;
    screen.textContent = screenText;
}

let screenText = '';

const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',Clicked);
}