/**
 * @todo add controllers for more specific request handling? (similar to how it is in the SEBA demo app)
 * @todo test cases
 */

// routes/api/course.js
const express = require('express');
const router = express.Router();

// Load Course Model
const Course = require('../../models/course');

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
router.get('/', (req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(error =>
            res.status(404).json({ message: 'No available Courses found' })
        );
});

/**
 * @route GET api/course/:id
 * @description Get single course by id
 * @access Public
 */
router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(error =>
            res
                .status(404)
                .json({ message: `No Course with id ${req.params.id} found` })
        );
});

/**
 * @route POST api/course/{payload}
 * @description
 * @access Public
 */
router.post('/', (req, res) => {
    Course.create(req.body)
        .then(course => res.json({ message: 'Course created successfully' }))
        .catch(error =>
            res.status(400).json({ errorMessage: 'Unable to add this course' })
        );
});

/**
 * @route PUT api/course/:id
 * @description updates a course by id
 * @Access Public
 */
router.put('/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, req.body)
        .then(course =>
            res.json({
                message: `Updated course ${req.params.id} successfully`
            })
        )
        .catch(error =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

/**
 * @route DELETE api/boooks/:id
 * @description deletes a course by id
 * @access Public
 */
router.delete('/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, req.body)
        .then(course =>
            res.json({
                message: `Course with id ${req.params.id} deleted successfully`
            })
        )
        .catch(err =>
            res
                .status(404)
                .json({ error: `No Course with id ${req.params.id}` })
        );
});

module.exports = router;
