const universityRepository = require('../repositories/universityRepository');

const findAllWithFacultiesAndCourses = () => {
    return universityRepository.findAllWithFacultiesAndCourses();
};

const findByIdWithFacultiesAndCourses = (id) => {
    return universityRepository.findByIdWithFacultiesAndCourses(id);
};

const create = (data) => {
    return universityRepository.create(data);
};

const findByNameWithFacultiesAndCourses = (name) => {
    return universityRepository.findByNameWithFacultiesAndCourses(name);
};

module.exports = {
    findAllWithFacultiesAndCourses,
    findByIdWithFacultiesAndCourses,
    create,
    findByNameWithFacultiesAndCourses
};
