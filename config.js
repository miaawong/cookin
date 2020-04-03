const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    port: process.env.PORT,
    db: process.env.DATABASE,
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    googleClientId: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET
};
