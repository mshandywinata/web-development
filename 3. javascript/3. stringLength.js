// import module for a convinient
const prompt = require('prompt-sync')();
const input = prompt('Type in your string input: ');
const limit = 180;

console.log(`You typed in ${input.length} of characters, now you have ${limit - input.length} characters left.`);