const Faculty = require('../models/faculty');
const University = require('../models/university');

const findAllWithCourses = () => {
    return Faculty.find().populate('courses');
};

const create = (data) => {
    return Faculty.create(data);
};

const findByIdWithCourses = (id) => {
    return Faculty.findOne({ _id: id }).populate('courses');
};

const findByIdCallback = (id, callback) => {
    return University.findOne({ _id: id }, callback);
};

module.exports = {
    findAllWithCourses,
    create,
    findByIdWithCourses,
    findByIdCallback
};
