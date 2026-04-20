import app from "./src/app.js";
import { config } from "./src/configs/index.js";

app.listen(config.port, () => {
  console.info(`Server running on: http://localhost:${config.port}`);
});
