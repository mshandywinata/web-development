const prompt = require('prompt-sync')();

function getRandPercent() {
    // generate 0-99
    // add 1 to change it to 1-100
    return Math.floor(Math.random() * 100);
}

const yourName = prompt('Your name: ');
const yourCrush = prompt("Your crush's name: ");
const result = getRandPercent();

console.log(`${yourName} and ${yourCrush} love's percentage is ${result}%`);