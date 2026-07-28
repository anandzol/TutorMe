const AWS = require('aws-sdk');
const documentRepository = require('../../repositories/documentRepository');
const s3Service = require('../../services/s3Service');

const AWSCredentials = {
    accessKey: '',
    secret: '',
    bucketName: 'tutorme-upload'
};

const getAllDocuments = (req, res, next) => {
    documentRepository.findAllSorted((err, docs) => {
        if (err) {
            return next(err);
        }
        res.status(200).send(docs);
    });
};

const uploadFile = function (req, res) {
    const file = req.file;
    const s3FileURL = 'https://tutorme-upload.s3.amazonaws.com/';

    let s3bucket = new AWS.S3({
        accessKeyId: AWSCredentials.accessKey,
        secretAccessKey: AWSCredentials.secret
    });

    var params = {
        Bucket: AWSCredentials.bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    s3bucket.upload(params, function (err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            var newFileUploaded = {
                name: file.originalname,
                fileDescription: req.body.description,
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
            };
            documentRepository.saveNew(newFileUploaded, function (error, document) {
                if (error) {
                    throw error;
                }
                res.send(document);
            });
        }
    });
};

const getDocumentById = (req, res, next) => {
    documentRepository.findById(req.params.id, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.status(200).send(docs);
    });
};

const deleteDocument = (req, res, next) => {
    documentRepository.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        let s3bucket = new AWS.S3({
            accessKeyId: AWSCredentials.accessKey,
            secretAccessKey: AWSCredentials.secret
        });

        let params = {
            Bucket: AWSCredentials.bucketName,
            Key: result.s3_key
        };

        s3bucket.deleteObject(params, (err, data) => {
            if (err) {
                return err;
            } else {
                res.send({
                    status: '200',
                    responseType: 'string',
                    response: 'success'
                });
            }
        });
    });
};

const downloadDocument = (req, res, next) => {
    documentRepository.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        let s3bucket = new AWS.S3({
            accessKeyId: AWSCredentials.accessKey,
            secretAccessKey: AWSCredentials.secret
        });

        let params = {
            Bucket: AWSCredentials.bucketName,
            Key: result.s3_key
        };

        const fileStream = s3bucket.getObject(params).createReadStream();
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + params.Key
        );
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    });
};

module.exports = {
    getAllDocuments,
    uploadFile,
    getDocumentById,
    deleteDocument,
    downloadDocument
};
