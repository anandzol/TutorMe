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
        .then(universities => res.json(universities))
        .catch(error =>
            res.status(404).json({
                error: 'No available Universities found',
                message: error.message
            })
        );
});

/**
 * @route GET api/university/:name
 * @description Get a university by name
 * @access Public
 */
router.get('/:name', UniversityController.getByName);

module.exports = router;
