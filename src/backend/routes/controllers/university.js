// routes/controller/university.js
const University = require('../../models/university');

/**
 * API Controller for fetching a new university by its name
 * @param {Object} req
 * @param {*} res
 * @returns
 */
const getByName = (req, res) => {
    University.findOne({ name: req.params.name })
        .populate('faculties', 'courses')
        .then(uni => {
            res.json(uni);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available uni with name: ${req.params.name}`,
                message: error.message
            })
        );
};

/**
 * API Controller for fetching all faculties of a university
 * @param {Object} req req.params.name contains the name of the university
 * @param {Object} res
 * @returns
 */
const getFaculties = (req, res) => {
    University.findOne({ name: req.params.name })
        .populate('faculties', 'courses')
        .then(uni => {
            res.json(uni.faculties);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available uni with name: ${req.params.name}`,
                message: error.message
            })
        );
};

/**
 * API Controller for fetching all courses of a university
 * @param {Object} req req.params.name contains the name of the university
 * @param {Object} res
 * @returns
 */
const getCourses = (req, res) => {
    University.findOne({ name: req.params.name })
        .populate('faculties', 'courses')
        .then(uni => {
            res.json(uni.courses);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available uni with name: ${req.params.name}`,
                message: error.message
            })
        );
};

module.exports = {
    getByName,
    getFaculties,
    getCourses
};
