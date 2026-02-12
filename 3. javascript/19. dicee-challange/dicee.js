// roll dice
function rollDice() {
    return Math.floor(Math.random() * 6 + 1);
}

function result(first, second) {
    if (first > second) {
        return "🚩 The First Player Win!";
    } else if (second > first) {
        return "The Second Player Win! 🚩";
    } else {
        return "It's a Draw! Everybody Win!";
    }
}

const imgPath = `./images/`
// select all img elements
const imgSelect = document.querySelectorAll('img');
// select the h1
const headerSelect = document.querySelector('h1');
// manipulate h1 text

const firstDice = rollDice();
const secondDice = rollDice();

headerSelect.innerText = result(firstDice, secondDice);

// select the 1st player image
const imgFirstPlayer = imgSelect[0];
// manipulate the attribute
imgFirstPlayer.setAttribute('src', `${imgPath}dice${firstDice}.png`);

// select the 2nd player image
const imgSecondPlayer = imgSelect[1];
// manipulate the attribute
imgSecondPlayer.setAttribute('src', `${imgPath}dice${secondDice}.png`);

const winner = result(firstDice, secondDice);