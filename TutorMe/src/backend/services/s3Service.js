const AWS = require('aws-sdk');

const AWSCredentials = {
    accessKeyId: '',
    secretAccessKey: ''
};

AWS.config.update({
    accessKeyId: AWSCredentials.accessKeyId,
    secretAccessKey: AWSCredentials.secretAccessKey
});

const s3 = new AWS.S3();

const uploadFile = (params, callback) => {
    return s3.upload(params, callback);
};

const deleteObject = (params, callback) => {
    return s3.deleteObject(params, callback);
};

const getObjectStream = (params) => {
    return s3.getObject(params).createReadStream();
};

module.exports = {
    uploadFile,
    deleteObject,
    getObjectStream
};
