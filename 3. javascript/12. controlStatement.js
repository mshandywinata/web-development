// weight in kg and height in m
function bmiCalculator(weight, height) {
    let score = Math.floor(weight / (height * height));
    let interpertation;

    if (score > 24.9) {
        interpertation = `Your BMI score is ${score}, you are overweight.`;
    } else if (score >= 18.5 && score <= 24.9) {
        interpertation = `Your BMI score is ${score}, you have a normal weight.`;
    } else {
        interpertation = `Your BMI score is ${score}, you are underweight.`;
    }

    return interpertation
}

let result = bmiCalculator(43, 1.6);
console.log(result);