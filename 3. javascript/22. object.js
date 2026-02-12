// declare object constructor function
function HouseKeeper(name, age, workHour, yearsOfExperience, birthPlace) {
    this.name = name;
    this.age = age;
    this.workHour = workHour;
    this.yearsOfExperience = yearsOfExperience;
    this.birthPlace = birthPlace;

    // crete method by declare anon function
    this.clean = function () {
        console.log('cleaning in progress...');
        console.log('cleaning done.');
    }
}

// create instance of the object
let jane = new HouseKeeper('Jane Wildow', 22, 8, 2, 'Boston');
jane.clean();