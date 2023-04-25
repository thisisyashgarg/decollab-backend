import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_API_KEY}`,
      consumerSecret: `${process.env.TWITTER_API_SECRET}`,
      callbackURL: `http://localhost:${process.env.PORT}/auth/twitter/callback`,
    },
    function (token, tokenSecret, profile, cb) {
      console.log(profile);
    }
  )
);
