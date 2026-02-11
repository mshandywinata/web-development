function test() {
    let a = 3; let b = 8;
    // declare new var as temp for either value
    let c = a; a = b; b = c;

    console.log("a is " + a);
    console.log("b is " + b);
}

test();