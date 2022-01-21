function Clicked(event) {
    if(event.target.textContent == 'CE')
    {
        screenText = '';
        screen.textContent = screenText;
        return;
    }
    screenText += event.target.textContent;
    screen.textContent = screenText;
}

let screenText = '';

const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',Clicked);
}