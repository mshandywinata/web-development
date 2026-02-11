let array = [];

// regular approach with for loop
// function fizzBuzz(limit) {
//     let array = [];

//     for (let i = 0; i < limit; i++) {
//         if (i % 3 === 0 && i % 5 === 0) {
//             array.push("fizzBuzz");
//         } else if (i % 3 === 0) {
//             array.push("fizz");
//         } else if (i % 5 === 0) {
//             array.push("buzz");
//         } else {
//             array.push(i);
//         }
//     }

//     return array;
// }


// scratch approach, too complicated
// function fizzBuzz(array) {
//     if (array.length === 0) {
//         array.push(1);
//     } else {
//         let i = array[array.length - 1] + 1;

//         if (i % 3 === 0 && i % 5 === 0) {
//             array.push("fizzBuzz");
//         } else if (i % 3 === 0) {
//             array.push("fizz");
//         } else if (i % 5 === 0) {
//             array.push("buzz");
//         } else {
//             array.push(i);
//         }
//     }

//     return array;
// }

let counter = 0;

function fizzBuzz(array) {
    counter++;
    const i = counter;
    
    if (i % 3 === 0 && i % 5 === 0) {
        array.push("fizzBuzz");
    } else if (i % 3 === 0) {
        array.push("fizz");
    } else if (i % 5 === 0) {
        array.push("buzz");
    } else {
        array.push(i);
    }

    return array;
}

console.log(fizzBuzz(array));
console.log(fizzBuzz(array));
console.log(fizzBuzz(array));
console.log(fizzBuzz(array));
console.log(fizzBuzz(array));
console.log(fizzBuzz(array));