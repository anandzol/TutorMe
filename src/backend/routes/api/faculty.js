const express = require('express');
const router = express.Router();

const Faculty = require('../../models/faculty');
const FacultyController = require('../controllers/faculty');

/**
 * @route GET api/faculty/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('university route testing!'));

/**
 * @route POST api/faculty/{payload}
 * @description
 * @access Public
 */
router.post('/', FacultyController.create);

module.exports = router;
