const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    port: process.env.PORT,
    db: process.env.DATABASE,
    jwtSecret: process.env.JWT_SECRET
};
