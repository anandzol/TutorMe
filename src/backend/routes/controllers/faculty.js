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
        University.findOne({ _id: faculty.university }, (err, university) => {
            if (university) {
                // Add faculty to list of faculties by university
                university.faculties.push(faculty);
                university.save();
            }
        });
        res.json({ message: 'Faculty created' });
    });
};

/**
 * API Controller for fetching all courses of a university
 * @param {Object} req req.params.name contains the name of the university
 * @param {Object} res
 * @returns
 */
const getCourses = (req, res) => {
    Faculty.findOne({ _id: req.params.id })
        .populate('courses')
        .then(faculty => {
            res.json(faculty.courses);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available faculty with id: ${req.params.id}`,
                message: error.message
            })
        );
};

module.exports = {
    create,
    getCourses
};
