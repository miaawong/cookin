const { jwtSecret } = require("./config");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

// JWS Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            // find the user specified in token
            // // is it better to use id or email?
            const user = await User.findOne({ email: payload.email });
            // if user doesn't exist, handle it
            if (!user) {
                return done(null, false);
            }

            done(null, user);
            // otherwise, return the user
        } catch (err) {
            done(err, false);
        }
    })
);
// JWT ends

//Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            try {
                //find the user from email
                const user = await User.findOne({ email });
                //if not handle
                if (!user) {
                    return done(null, false);
                }
                // check if password is correct
                const isValidPassword = await user.passwordValid(password);
                if (!isValidPassword) {
                    return done(null, false);
                }
                done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);
