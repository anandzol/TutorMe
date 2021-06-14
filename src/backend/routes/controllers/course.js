// routes/controller/course.js

const University = require('../../models/university');
const Faculty = require('../../models/faculty');
const Course = require('../../models/course');
/**
 * API Controller for creating a new faculty
 * @param {Object} req
 * @param {Object} res
 */
const create = (req, res) => {
    Course.create(req.body).then(course => {
        University.findOne({ _id: course.university }, (err, university) => {
            if (course) {
                // Add faculty to list of faculties by university
                university.courses.push(course);
                university.save();
            }
        });
        Faculty.findOne({ _id: course.faculty }, (err, faculty) => {
            if (faculty) {
                faculty.courses.push(course);
                faculty.save();
            }
        });
        res.json({ message: 'Course created' });
    });
};

module.exports = {
    create
};
