const TutorialSession = require('../../models/tutorialSession');
const uploadFile = require('../api/fileUpload');

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

/**
 * API Controller for getting a specific session by id
 * @param {Object} req
 * @param {Object} res
 */
const getSessionById = (req, res) => {
    console.log(req.params.id);
    TutorialSession.findOne({ _id: req.params.id })
        .populate('course')
        .then(session => {
            res.json(session);
        })
        .catch(error => {
            res.status(404).json({
                error: 'No available session found',
                message: error.message
            });
        });
};

/**
 * API Controller for update status of session by document id
 * @param {Object} req req.params.id contains id of the document
 * @param {Object} res response made to the client
 */
const updateStatusByDocumentId = (req, res) => {
    TutorialSession.updateOne(
        { cv: req.params.id },
        { $set: { status: req.params.status } }
    )
        .then(session => {
            res.json(session);
            // message: `Updated tutorial session for document ${req.params.id} successfully'
        })
        .catch(error => res.status(400).json(error));
};

//test
const getAllPendingDocuments = (req, res) => {
    TutorialSession.find({ status: 'pending' })
        .populate('tutorId', { firstName: 1, lastName: 1 })
        .populate('course', { name: 1 })
        .populate('university', { name: 1 })
        .populate('cv', { _id: 1, name: 1, fileLink: 1 })
        .populate('transcript', { _id: 1, name: 1, fileLink: 1 })
        .sort({ updatedAt: -1 })
        .then(sessions => res.status(200).json(sessions))
        .catch(error =>
            res.status(400).json({
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
    getAllPending,
    getSessionById,
    updateStatusByDocumentId,
    getAllPendingDocuments
};
