// import module for a convinient
const prompt = require('prompt-sync')();
const input = prompt('Type in your string input: ');

const length = input.length;
const limit = 5;
// 0 is the first index char
const sliced = input.slice(0, limit);

console.log(`You typed in: '${sliced}', the rest of ${Math.abs(limit - length)} of chars are sliced`)