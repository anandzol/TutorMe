// routes/controller/faculty.js

const facultyService = require('../../services/facultyService');

const getAll = (req, res) => {
    facultyService.findAllWithCourses()
        .then(faculty => res.json(faculty))
        .catch(error =>
            res.status(404).json({ message: 'No available Faculties found' })
        );
};

const create = (req, res) => {
    facultyService.create(req.body).then(faculty => {
        res.json({ message: 'Faculty created' });
    });
};

const getCourses = (req, res) => {
    facultyService.findByIdWithCourses(req.params.id)
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
    getAll,
    create,
    getCourses
};
