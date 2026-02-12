function makeSound(char) {
    switch (char) {
        case 'w':
            const tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;
        case 'a':
            const tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;
        case 's':
            const tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;
        case 'd':
            const tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;
        case 'j':
            const crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;
        case 'k':
            const kick = new Audio('./sounds/kick-bass.mp3');
            kick.play();
            break;
        case 'l':
            const snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;
        default:
            console.log(pressedKey)
        }
}

const drumButtons = document.querySelectorAll('.drum');

// detect the button press by click
for (let i = 0; i < drumButtons.length; i++) {
    // keydown event should be attached to entire document object
    drumButtons[i].addEventListener('click', function () {
        // by using anon function we could get the 'this' value instead of using arrow function
        let buttonKey = this.innerHTML;
        makeSound(buttonKey);
    })
}

// detect the keyboard key by attached the event listener to the entire document
document.addEventListener('keydown', function (event) {
    makeSound(event.key);
})