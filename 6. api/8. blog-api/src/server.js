import config from "./config.js";
import app from "./app.js";

const PORT = config.PORT;
export const API_KEY = config.API_KEY;

app.listen(PORT, () => {
    console.info(`Backend running on: http://localhost:${PORT}`);
});
