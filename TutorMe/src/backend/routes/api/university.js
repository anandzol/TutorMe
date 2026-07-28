const express = require('express');
const router = express.Router();

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
router.get('/', UniversityController.getAll);

/**
 * @route GET api/university/:id
 * @description Get single course by id
 * @access Public
 */
router.get('/:id', UniversityController.getById);

/**
 * @route POST api/university/{payload}
 * @description
 * @access Public
 */
router.post('/', UniversityController.create);

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
