// routes/controller/university.js

const universityService = require('../../services/universityService');

const getAll = (req, res) => {
    universityService.findAllWithFacultiesAndCourses()
        .then(universities => res.json(universities))
        .catch(error =>
            res.status(404).json({
                error: 'No available Universities found',
                message: error.message
            })
        );
};

const getById = (req, res) => {
    universityService.findByIdWithFacultiesAndCourses(req.params.id)
        .then(course => res.json(course))
        .catch(error =>
            res
                .status(404)
                .json({ message: `No Course with id ${req.params.id} found` })
        );
};

const create = (req, res) => {
    universityService.create(req.body)
        .then(uni => res.json({ message: 'University created successfully' }))
        .catch(error =>
            res
                .status(400)
                .json({ errorMessage: 'Unable to create this university' })
        );
};

const getByName = (req, res) => {
    universityService.findByNameWithFacultiesAndCourses(req.params.name)
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

const getFaculties = (req, res) => {
    universityService.findByNameWithFacultiesAndCourses(req.params.name)
        .then(uni => {
            res.json(uni.faculties);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available uni with name: ${req.params.name}`,
                message: error.message
            })
        );
};

const getCourses = (req, res) => {
    universityService.findByNameWithFacultiesAndCourses(req.params.name)
        .then(uni => {
            res.json(uni.courses);
        })
        .catch(error =>
            res.status(404).json({
                error: `No available uni with name: ${req.params.name}`,
                message: error.message
            })
        );
};

module.exports = {
    getAll,
    getById,
    create,
    getByName,
    getFaculties,
    getCourses
};
