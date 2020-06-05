const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { secretAccessKey, accessKey, region, bucket } = require("../config");

const s3 = new AWS.S3({
    secretAccessKey,
    region,
    accessKeyId: accessKey,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldName });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString());
        },
    }),
});

module.exports = upload;
