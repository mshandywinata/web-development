function fibonacciGenerator(n) {
    // declare container for sequence
    let seq = [];

    for (let i = 0; i < n; i++) {
        // add first 2 sequence
        if (i <= 1) {
            seq.push(i);
        } else {
            // add the rest fib(i + fib(i))
            seq.push(seq[i - 1] + seq[i - 2]);
        }
    }

    return seq;
}

// secondary approach
// function fibonacciGenerator(n) {
//     let seq = [];

//     if (n === 1) {
//         return seq = [0];
//     } else if (n === 2) {
//         return seq = [0, 1];
//     }
//     // seeding the first 2 element
//     seq = [0, 1];
//     // iterate for the rest
//     for (let i = 2; i < n; i++) {
//         seq.push(seq[seq.length - 2] + seq[seq.length - 1]);
//     } return seq;
// }

let result = fibonacciGenerator(10);
console.log(result);