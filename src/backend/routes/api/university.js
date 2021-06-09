const express = require('express');
const router = express.Router();

const University = require('../../models/university');
const UniversityController = require('../controllers/university');

/**
 * @route GET api/university/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('university route testing!'));

/**
 * @route GET api/university
 * @description Get all available universities
 * @access Public
 */
router.get('/', (req, res) => {
    University.find()
        .populate('faculties', 'courses')
        .then(universities => res.json(universities))
        .catch(error =>
            res.status(404).json({
                error: 'No available Universities found',
                message: error.message
            })
        );
});

/**
 * @route GET api/university/:id
 * @description Get single course by id
 * @access Public
 */
router.get('/:id', (req, res) => {
    University.findById(req.params.id)
        .then(course => res.json(course))
        .catch(error =>
            res
                .status(404)
                .json({ message: `No Course with id ${req.params.id} found` })
        );
});

/**
 * @route POST api/university/{payload}
 * @description
 * @access Public
 */
router.post('/', (req, res) => {
    University.create(req.body)
        .then(uni => res.json({ message: 'University created successfully' }))
        .catch(error =>
            res
                .status(400)
                .json({ errorMessage: 'Unable to create this university' })
        );
});

/**
 * @route GET api/university/:name
 * @description Get a university by name
 * @access Public
 */
router.get('/:name', UniversityController.getByName);

/**
 * @route GET api/university/faculties/:name
 * @description Get all faculties of a university
 * @access Public
 */
router.get('/faculties/:name', UniversityController.getFaculties);

module.exports = router;
