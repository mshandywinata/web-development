const prompt = require('prompt-sync')();

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const modulo = (a, b) => {
    return a % b;
}

const calculator = (a, b, operator) => {
    return operator(a, b);
}

const options = (operator) => {
    if (operator === '+') {
        return add;
    } else if (operator === '-') {
        return subtract;
    } else if (operator === '*') {
        return multiply;
    } else if (operator === '/') {
        return divide;
    } else if (operator === '%') {
        return modulo;
    }
}

const firstNumber = parseInt(prompt('first number: '));
const secondNumber = parseInt(prompt('second number: '));
const operator = prompt("operator ['+', '-', '*', '/', '%']: ");

const result = calculator(firstNumber, secondNumber, options(operator));
console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);