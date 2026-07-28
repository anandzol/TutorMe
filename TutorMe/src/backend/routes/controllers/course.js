// routes/controller/course.js

const courseService = require('../../services/courseService');

const getAll = (req, res) => {
    courseService.findAll()
        .then(courses => res.json(courses))
        .catch(error =>
            res.status(404).json({ message: 'No available Courses found' })
        );
};

const getById = (req, res) => {
    courseService.findById(req.params.id)
        .then(course => res.json(course))
        .catch(error =>
            res
                .status(404)
                .json({ message: `No Course with id ${req.params.id} found` })
        );
};

const create = (req, res) => {
    courseService.create(req.body).then(course => {
        res.json({ message: 'Course created' });
    });
};

const updateById = (req, res) => {
    courseService.updateById(req.params.id, req.body)
        .then(course =>
            res.json({
                message: `Updated course ${req.params.id} successfully`
            })
        )
        .catch(error =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
};

const deleteById = (req, res) => {
    courseService.deleteById(req.params.id, req.body)
        .then(course =>
            res.json({
                message: `Course with id ${req.params.id} deleted successfully`
            })
        )
        .catch(err =>
            res
                .status(404)
                .json({ error: `No Course with id ${req.params.id}` })
        );
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
