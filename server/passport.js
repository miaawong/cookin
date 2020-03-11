// const passport = require("passport");
// const { Strategy, ExtractJwt } = require("passport-jwt");
// const { jwtSecret } = require("../config");

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: jwtSecret
// };

// module.exports = passport => {
//     passport.use(new Strategy(opts, (payload, done) => {
//         User.findById(payload.id)
//         .then(user => {
//             if (user)
//         })
//     }))
// }
