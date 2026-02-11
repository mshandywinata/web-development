let x = 3;
// this has no effect to y than assign it to the former value of x
// y set to x before x get incremented
let y = x++;
y--;
// expected to return 2
console.log(y);