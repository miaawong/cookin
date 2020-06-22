module.exports = {
    port: process.env.PORT,
    db: process.env.DATABASE,
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    googleClientId: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    secretAccessKey: process.env.AWS_SECRET,
    accessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.BUCKET,
};
