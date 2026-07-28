const express = require('express');
const router = express.Router();

const FacultyController = require('../controllers/faculty');

/**
 * @route GET api/faculty/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('university route testing!'));

/**
 * @route GET api/faculty
 * @description Get all available faculties
 * @access Public
 */
router.get('/', FacultyController.getAll);

/**
 * @route POST api/faculty/{payload}
 * @description
 * @access Public
 */
router.post('/', FacultyController.create);

/**
 * @route GET api/faculty/courses/:id
 * @description
 * @access Public
 */
router.get('/courses/:id', FacultyController.getCourses);

/**
 * @route POST api/faculty/uploadCV
 * @description
 * @access Public
 */

module.exports = router;
