import axios from "axios";
import fs from "fs";
import path from "path";

const fetchCover = async (isbn) => {
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  const fileName = isbn;
  const saveDirectory = path.join(
    process.cwd(),
    "public",
    "assets",
    "images",
    "covers",
  );
  const savePath = path.join(saveDirectory, `${fileName}.jpg`);
  const dbPath = `/assets/images/covers/${isbn}.jpg`;

  try {
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    const response = await axios.get(url, { responseType: "stream" });
    const fileStream = fs.createWriteStream(savePath);

    response.data.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        console.log(`Cover image saved to: ${savePath}`);
        resolve(dbPath);
      });
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error(`Error fetching and saving the cover image: ${error}`);
    return "/assets/images/covers/default-cover.jpg";
  }
};

export default fetchCover;
