// same as before
const prompt = require('prompt-sync')();
const dogAge = prompt('Insert your dog age: ');
// convert the input to integer
// outer parenteses used for clarity
const humanAge = ((parseInt(dogAge) - 2) * 4) + 21;

console.log(`If your dog is ${dogAge} y.o then it's ${humanAge} y.o in human age`);