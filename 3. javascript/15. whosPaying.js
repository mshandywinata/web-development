function whosPaying(names) {
    return `${names[Math.floor(Math.random() * names.length)]} is going to buy lunch today!`;
}

myCircle = ['Shandy', 'Winata', 'Muhamad'];

console.log(whosPaying(myCircle));