const fs = require("fs");

const FILE = "message.txt";

let data = `
Node is an asynchronous event driven JavaScript runtime to built
scalable server application (ranging from web to desktop).

Aysnchronous means each code (functionality) could be run independently from
one to another without the need to waiting the other one to be done first.

Event driven means the functionality could be run automatically when a certain
condition (event) is met.

Server application is an application that stored in server device. Commonly consist
of bussiness logic, data-oriented operation, or any code/functionality that should
be hidden from client device (e.g. browser).
`;

fs.writeFile(FILE, data, (err) => {
    if (err) throw err;
    console.log(`sucessfully write data as ${FILE}`);
});

fs.readFile(FILE, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});