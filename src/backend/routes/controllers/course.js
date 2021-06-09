// routes/controller/course.js
const University = require('../../models/university');
const Faculty = require('../../models/faculty');
const Course = require('../../ models/course');
/**
 * API Controller for creating a new faculty
 * @param {Object} req
 * @param {Object} res
 */
const create = (req, res) => {
    Course.create(req.body).then(faculty => {
        University.findOne({ _id: faculty.university }, (err, university) => {
            if (university) {
                // Add faculty to list of faculties by university
                university.faculties.push(faculty);
                university.save();
                res.json({ message: 'Faculty created' });
            }
        });
    });
};
