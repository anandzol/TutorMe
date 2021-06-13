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
 * @route GET api/faculty
 * @description Get all available faculties
 * @access Public
 */
router.get('/', (req, res) => {
    Faculty.find()
        .populate('courses')
        .then(faculty => res.json(faculty))
        .catch(error =>
            res.status(404).json({ message: 'No available Faculties found' })
        );
});

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
module.exports = router;
