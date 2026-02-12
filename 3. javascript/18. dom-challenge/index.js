// select last item of a list
const thirdList = document.querySelector('ul').lastElementChild;
// set the text
thirdList.innerHTML = "Shandy";

// select anchor element inside list
const anchorList = document.querySelector('li a');
// set the color
anchorList.style.color = 'red';

// select the button
const button = document.querySelector('button');
// set the color
button.style.backgroundColor = 'yellow';

// select the header
const header = document.querySelector('h1');
// apply a class instead of set style individually
header.classList.add('huge');

// manipulate the text from a html selection
const headerHtml = document.querySelector('h1').innerHTML;
console.log(headerHtml);
// manipulate only the CONTENT of the text from html
const headerText = document.querySelector('h1').innerText;
console.log(headerText);

// manipute attribute
// get all the attributes
const anchorAttributes = document.querySelector('a').attributes;
// get single value of an attribute
const anchorAttribute = document.querySelector('a').getAttribute('href');
// set single value of an attribute
const setAnchorAttribute = document.querySelector('h1').setAttribute('href', 'https://mshandywinata.github.io');