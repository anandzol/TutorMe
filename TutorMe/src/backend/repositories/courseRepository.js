const Course = require('../models/course');

const findAll = () => {
    return Course.find();
};

const findById = (id) => {
    return Course.findById(id);
};

const create = (data) => {
    return Course.create(data);
};

const updateById = (id, data) => {
    return Course.findByIdAndUpdate(id, data);
};

const deleteById = (id, data) => {
    return Course.findByIdAndRemove(id, data);
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
