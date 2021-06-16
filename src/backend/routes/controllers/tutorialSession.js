const TutorialSession = require('../../models/tutorialSession');

/**
 * API Controller for getting all sessions by university id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getByUniversityId = (req, res) => {
    TutorialSession.find({ university: req.params.id })
        .populate('course')
        .sort({ updatedAt: -1 })
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

/**
 * API Controller for getting all verified sessions by university id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getAllVerifiedByUniversityId = (req, res) => {
    TutorialSession.find({ university: req.params.id, status: 'verified' })
        .populate('course')
        .sort({ updatedAt: -1 })
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

/**
 * API Controller for getting all pending sessions
 * @param {Object} req request by client
 * @param {Object} res response made to the client
 */
const getAllPending = (req, res) => {
    TutorialSession.find({ status: 'pending' })
        .populate('course')
        .sort({ updatedAt: -1 })
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

/**
 * API Controller for getting all pending sessions by university id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getAllPendingByUniversityId = (req, res) => {
    TutorialSession.find({ university: req.params.id, status: 'pending' })
        .populate('course')
        .sort({ updatedAt: -1 })
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};
/**
 * API Controller for getting all rejected sessions by university id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getAllRejectedByUniversityId = (req, res) => {
    TutorialSession.find({ university: req.params.id, status: 'pending' })
        .populate('course')
        .sort({ updatedAt: -1 })
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};
module.exports = {
    getByUniversityId,
    getAllVerifiedByUniversityId,
    getAllRejectedByUniversityId,
    getAllPendingByUniversityId,
    getAllPending
};