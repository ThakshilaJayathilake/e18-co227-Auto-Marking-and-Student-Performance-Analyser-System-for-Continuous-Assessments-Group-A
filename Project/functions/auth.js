const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID= '204066930237-o8uffceob49huukgospuirmuuptglr25.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/group07-co227/us-central1/app",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, done) {
     console.log(profile);
    return done(null, profile);
    
  }
));
passport.serializeUser(function (user,done) {
    done(null,user);
});
passport.deserializeUser(function (user,done) {
    done(null,user);
});