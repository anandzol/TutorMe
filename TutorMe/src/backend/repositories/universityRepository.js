const University = require('../models/university');

const findAllWithFacultiesAndCourses = () => {
    return University.find().populate({
        path: 'faculties courses',
        populate: {
            path: 'courses'
        }
    }).sort({ name: 1 });
};

const findByIdWithFacultiesAndCourses = (id) => {
    return University.findById(id).populate({
        path: 'faculties courses',
        populate: {
            path: 'courses'
        }
    }).sort({ name: 1 });
};

const create = (data) => {
    return University.create(data);
};

const findByNameWithFacultiesAndCourses = (name) => {
    return University.findOne({ name }).populate({
        path: 'faculties',
        populate: {
            path: 'courses'
        }
    }).sort({ name: 1 });
};

const findByIdCallback = (id, callback) => {
    return University.findOne({ _id: id }, callback);
};

module.exports = {
    findAllWithFacultiesAndCourses,
    findByIdWithFacultiesAndCourses,
    create,
    findByNameWithFacultiesAndCourses,
    findByIdCallback
};
