import { config } from "dotenv";

config();

export default {
    PORT: process.env.SERVER_PORT || 1313,
    API_KEY: process.env.API_KEY || "", 
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:1313",
};