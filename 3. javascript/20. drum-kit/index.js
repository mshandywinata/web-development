const drumButtons = document.querySelectorAll('.drum');

for (let i = 0; i < drumButtons.length; i++) {
    drumButtons[i].addEventListener('click', () => {
        alert(`${drumButtons[i].innerText} got clicked!`);
    })
}