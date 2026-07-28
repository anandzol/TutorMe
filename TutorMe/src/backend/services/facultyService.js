const facultyRepository = require('../repositories/facultyRepository');
const universityRepository = require('../repositories/universityRepository');

const findAllWithCourses = () => {
    return facultyRepository.findAllWithCourses();
};

const create = (data) => {
    return facultyRepository.create(data).then(faculty => {
        universityRepository.findByIdCallback(faculty.university, (err, university) => {
            if (university) {
                university.faculties.push(faculty);
                university.save();
            }
        });
        return faculty;
    });
};

const findByIdWithCourses = (id) => {
    return facultyRepository.findByIdWithCourses(id);
};

module.exports = {
    findAllWithCourses,
    create,
    findByIdWithCourses
};
