/**
 * @todo test cases
 */

// routes/api/course.js
const express = require('express');
const router = express.Router();

// Load Course Controller
const CourseController = require('../controllers/course');
/**
 * @route GET api/course/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('course route testing!'));

/**
 * @route GET api/course
 * @description Get all available courses
 * @access Public
 */
router.get('/', CourseController.getAll);

/**
 * @route GET api/course/:id
 * @description Get single course by id
 * @access Public
 */
router.get('/:id', CourseController.getById);

/**
 * @route POST api/course/{payload}
 * @description
 * @access Public
 */
router.post('/', CourseController.create);

/**
 * @route PUT api/course/:id
 * @description updates a course by id
 * @Access Public
 */
router.put('/:id', CourseController.updateById);

/**
 * @route DELETE api/boooks/:id
 * @description deletes a course by id
 * @access Public
 */
router.delete('/:id', CourseController.deleteById);

module.exports = router;
