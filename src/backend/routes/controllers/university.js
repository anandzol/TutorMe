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

module.exports = {
    getByName
};
