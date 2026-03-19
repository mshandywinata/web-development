import enquirer from "enquirer";
import qr from "qr-image";
import fs from "fs";

const FILE = "input.txt";
const IMAGE = "qrCode.png";

// THIS IS ORIGINAL VERSION I COME UP WITH
(async () => {
    try {
        const response = await enquirer.prompt([
            {
                type: "input",
                name: "URL",
                message: "Type your URL: "
            },
        ]);

        const qrPng = qr.image(response.URL, { type: "png" });
        qrPng.pipe(fs.createWriteStream(IMAGE));

        fs.writeFile(FILE, response.URL, (error) => {
            if (error) throw error;
            console.log(`successfully write "${response.URL}" to ${FILE}`);
        });   
    } catch (error) {
        console.error(`an error occured: ${error}`);
    }
})();


// THIS IS CHAINING METHOD (OLD)
// enquirer.prompt([
//     {
//         type: "input",
//         name: "URL",
//         message: "Type your URL: "
//     },
// ])
// .then(answers => {
//     const url = answers.URL;

//     const qrImage = qr.image(url, { type: "png" });
//     qrImage.pipe(fs.createWriteStream(IMAGE));

//     fs.writeFile(FILE, url, (err) => {
//         if (err) throw err;
//         console.log(`successfully write "${url}" to ${FILE}`);
//     });
// })
// .catch(err => {
//     console.error(`an error occured: ${err}`);
// })