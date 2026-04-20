import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  saltRound: process.env.SALT_ROUND || 10,
  databaseUrl: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};

export const hello = "world";
