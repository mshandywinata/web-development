import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUser } from "../services.js";
import { isMatch } from "../utils.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await findUser(email);
        if (!user) {
          return done(null, false, {
            message: "User not found.",
          });
        }
        // hashing the entered password is unnecessary
        // as it's already handled by compare() method
        const loggedIn = await isMatch(password, user.password);

        if (!loggedIn) {
          return done(null, false, {
            message: "Invalid credentials.",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error(error);

        return done(error);
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
  } catch (error) {
    done(error, null);
  }
});
