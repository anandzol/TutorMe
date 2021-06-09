// routes/controller/faculty.js
const University = require('../../models/university');
const Faculty = require('../../models/faculty');

/**
 * API Controller for creating a new faculty
 * @param {Object} req
 * @param {Object} res
 */
const create = (req, res) => {
    Faculty.create(req.body).then(faculty => {
        University.findOne({ _id: faculty.universityId }, (err, university) => {
            if (university) {
                // Add faculty to list of faculties by university
                university.faculties.push(faculty);
                university.save();
                res.json({ message: 'Faculty created' });
            }
        });
    });
};

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
    create
};
