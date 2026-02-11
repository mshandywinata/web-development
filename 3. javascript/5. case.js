// import module for a convinient
const prompt = require('prompt-sync')();
let name = prompt('What is your name? ');
// get the first char and set upper and add the rest of the original
// 1. isolate first char and set upper
const nameFirstChar = name.slice(0, 1).toUpperCase();
// 2. isolate rest and set lower
const nameRest = name.slice(1, name.length).toLocaleLowerCase();
// 3. concate them
name = nameFirstChar + nameRest;

console.log(`Hello, ${name}!`)