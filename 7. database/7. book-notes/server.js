import app from "./src/app.js";
import { config } from "./src/configs/index.js";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
