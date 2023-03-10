const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
// Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const Document = require('../../models/document');

const AWSCredentials = {
    accessKey: '',
    secret: '',
    bucketName: 'tutorme-upload'
};

// Get all Documents s Routes
router.route('/').get((req, res, next) => {
    Document.find(
        {},
        null,
        {
            sort: { createdAt: 1 }
        },
        (err, docs) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(docs);
        }
    );
});

/**
 * @route post api/fileupload
 * @description Upload a file
 * @access Public
 */
router.post('/', upload.single('file'), function (req, res) {
    const file = req.file;
    const s3FileURL = 'https://tutorme-upload.s3.amazonaws.com/';

    let s3bucket = new AWS.S3({
        accessKeyId: AWSCredentials.accessKey,
        secretAccessKey: AWSCredentials.secret
    });

    //Where you want to store your file

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
            // res.send({ data });
            var newFileUploaded = {
                name: file.originalname,
                fileDescription: req.body.description,
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
            };
            var document = new Document(newFileUploaded);
            document.save(function (error, newFile) {
                if (error) {
                    throw error;
                }
                res.send(document);
            });
        }
    });
});

/**
 * @route get api/fileupload
 * @description get a file by id
 * @access Public
 */
router.get('/:id', (req, res, next) => {
    Document.findById(req.params.id, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.status(200).send(docs);
    });
});

/**
 * @route delete api/fileupload/:id
 * @description delete a file
 * @access Public
 */
router.delete('/:id', (req, res, next) => {
    Document.findByIdAndRemove(req.params.id, (err, result) => {
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
});

/**
 * @route get api/fileupload/download/:id
 * @description download a file
 * @access Public
 */
router.get('/download/:id', (req, res, next) => {
    Document.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        let s3bucket = new AWS.S3({
            accessKeyId: AWSCredentials.accessKey,
            secretAccessKey: AWSCredentials.secret
            //region: process.env.AWS_REGION
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
});

module.exports = router;
