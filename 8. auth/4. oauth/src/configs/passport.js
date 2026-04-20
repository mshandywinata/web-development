import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createUser, findGoogle, findUser, linkGoogle } from "../services.js";
import { isMatch } from "../utils.js";
import { config } from "./index.js";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await findUser(email);
        
        console.log(user);

        if (!user) {
          return done(null, false, {
            message: "User not found.",
          });
        }


        const loggedIn = await isMatch(password, user.password);

        console.log(loggedIn);

        if (!loggedIn) {
          return done(null, false, {
            message: "Invalid credentials.",
          });
        }

        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    },
  ),
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: `http://localhost:${config.port}/auth/google/secrets`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await findGoogle(profile);

        if (!user) {
          user = await findUser(profile.email);

          if (!user) {
            user = await createUser(profile.email, profile.id);
          } else {
            user = await linkGoogle(profile);
          }
        }

        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await findUser(email);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
