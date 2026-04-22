import app from "./src/app";
import { config } from "./src/configs";

const PORT = config?.PORT;

app.listen(PORT, () => {
  console.info(`Running on: http://localhost:${PORT}`);
});
