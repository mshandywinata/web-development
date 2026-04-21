// always throw error
function err(): never {
  throw new Error();
}

// infinite loop
function foo(): never {
  while (true) {
    console.log("bar");
  }
}

// both of these must be typed as never
// so we get the highlight

foo();
// out of reached
err();
console.log("foo");
