// routes/controllers/user.js

const userService = require('../../services/userService');

const getAll = (req, res) => {
    userService.findAll(req, res);
};

const getUserById = (req, res) => {
    userService.getUserById(req, res);
};

const updateUserById = (req, res) => {
    userService.updateUserById(req, res);
};

const getUserSessionsById = (req, res) => {
    userService.getUserSessionsById(req, res);
};

const getExperienceRatingByUserId = (req, res) => {
    userService.getExperienceRatingByUserId(req, res);
};
module.exports = {
    getAll,
    getUserById,
    getUserSessionsById,
    getExperienceRatingByUserId,
    updateUserById
};
