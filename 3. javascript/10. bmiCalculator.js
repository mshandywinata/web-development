function bmiCalculator(weight, height) {
    return Math.floor(weight / (height ** 2));
}

console.log(bmiCalculator(65, 1.8));