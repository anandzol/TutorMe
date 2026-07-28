const express = require('express');
const router = express.Router();
const multer = require('multer');
const FileUploadController = require('../controllers/fileUpload');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.route('/').get(FileUploadController.getAllDocuments);

/**
 * @route post api/fileupload
 * @description Upload a file
 * @access Public
 */
router.post('/', upload.single('file'), FileUploadController.uploadFile);

/**
 * @route get api/fileupload/:id
 * @description get a file by id
 * @access Public
 */
router.get('/:id', FileUploadController.getDocumentById);

/**
 * @route delete api/fileupload/:id
 * @description delete a file
 * @access Public
 */
router.delete('/:id', FileUploadController.deleteDocument);

/**
 * @route get api/fileupload/download/:id
 * @description download a file
 * @access Public
 */
router.get('/download/:id', FileUploadController.downloadDocument);

module.exports = router;
