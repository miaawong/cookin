const { jwtSecret, googleClientId, googleSecret } = require("./config");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

// JWT Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            // find the user specified in token
            const user = await User.findById(payload.id);
            if (!user) {
                return done(null, false);
            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);
// JWT ends

// GOOGLE OAUTH Strategy
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: googleClientId,
//             clientSecret: googleSecret,
//             callbackURL: "http://localhost:3000"
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             console.log("accesstoken", accessToken);
//             console.log("refreshToken", refreshToken);
//             console.log("profile", profile);
//             done(null, profile);
//         }
//     )
// );

//Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            try {
                console.log("trying to lgin in passport");
                //find the user from email
                const user = await User.findOne({ email });
                //if not handle
                if (!user) {
                    console.log("did not find user");
                    return done(null, false);
                }
                // check if password is correct
                // had await but created login bug
                const isValidPassword = user.passwordValid(password);
                if (!isValidPassword) {
                    console.log("password not valid");
                    return done(null, false);
                }

                done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);
