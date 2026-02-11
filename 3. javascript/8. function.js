function put() {
    console.log('put');
}

function move() {
    console.log('move');
}

function left() {
    console.log('left');
}

function right() {
    console.log('right');
}

function main() {
    stepOdd();
    stepEven();
    stepOdd();
    stepEven();
    stepOdd();
}

function turnOdd() {
    left();
    move();
    left();
}

function turnEven() {
    right();
    move();
    right();
}

function stepOdd() {
    put();
    move();
    move();
    put();
    move();
    move();
    put();
    turnOdd();
}

function stepEven() {
    move();
    put();
    move();
    move();
    put();
    move();
    turnEven();
}

main();