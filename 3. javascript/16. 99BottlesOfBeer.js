function printLyrics(bottles) {
    let bottlesCount = bottles;

    while (i) {
        let bottleWord = 'bottles';

        if (bottlesCount === 1) {
            bottleWord = 'bottle'
        }

        console.log(`${bottlesCount} ${bottleWord} of beer on the wall, ${bottlesCount} of beer.`);

        if (bottlesCount > 1) {
            console.log(`Take one down and pass it around, ${bottlesCount - 1} of beer on the wall.\n`);
        } else {
            console.log(`Take one down and pass it around, no more bottles of beer on the wall.\n`);
        } bottlesCount--;
    }

    console.log('No more bottles of beer on the wall, no more bottles of beer.');
    console.log(`Go to the store and buy some more, ${bottles} bottles of beer on the wall.`);
}

printLyrics(3);