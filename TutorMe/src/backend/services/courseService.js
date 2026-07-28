const courseRepository = require('../repositories/courseRepository');
const universityRepository = require('../repositories/universityRepository');
const facultyRepository = require('../repositories/facultyRepository');

const findAll = () => {
    return courseRepository.findAll();
};

const findById = (id) => {
    return courseRepository.findById(id);
};

const create = (data) => {
    return courseRepository.create(data).then(course => {
        universityRepository.findByIdCallback(course.university, (err, university) => {
            if (course) {
                university.courses.push(course);
                university.save();
            }
        });
        facultyRepository.findByIdCallback(course.faculty, (err, faculty) => {
            if (faculty) {
                faculty.courses.push(course);
                faculty.save();
            }
        });
        return course;
    });
};

const updateById = (id, data) => {
    return courseRepository.updateById(id, data);
};

const deleteById = (id, data) => {
    return courseRepository.deleteById(id, data);
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
