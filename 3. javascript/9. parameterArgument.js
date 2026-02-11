function lifeInWeeks(age) {
    let left = 90 - age;
    let days = 365 * left;
    let weeks = Math.floor(days / 7);
    let months = Math.floor(weeks / 4.3);

    console.log(`You have ${days} days, ${weeks} weeks, and ${months} months left.`);
}

lifeInWeeks(91);