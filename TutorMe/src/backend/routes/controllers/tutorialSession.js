const tutorialSessionService = require('../../services/tutorialSessionService');

const getByUniversityId = (req, res) => {
    tutorialSessionService.getByUniversityId(req.params.id)
        .then(sessions => {
            res.json(sessions);
        })
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const getAllVerifiedByUniversityId = (req, res) => {
    tutorialSessionService.getAllVerifiedByUniversityId(req.params.id)
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const getAllPending = (req, res) => {
    tutorialSessionService.getAllPending()
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const getAllPendingByUniversityId = (req, res) => {
    tutorialSessionService.getAllPendingByUniversityId(req.params.id)
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};
const getAllRejectedByUniversityId = (req, res) => {
    tutorialSessionService.getAllRejectedByUniversityId(req.params.id)
        .then(sessions => {
            res.json(sessions);
        })
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const getSessionById = (req, res) => {
    tutorialSessionService.findByIdWithCourse(req.params.id)
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

const updateStatusByDocumentId = (req, res) => {
    tutorialSessionService.updateStatusByDocumentId(req.params.id, req.params.status)
        .then(session => {
            res.json(session);
        })
        .catch(error => res.status(400).json(error));
};

const getAllPendingDocuments = (req, res) => {
    tutorialSessionService.findAllPendingDocuments()
        .then(sessions => res.status(200).json(sessions))
        .catch(error =>
            res.status(400).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const getSessionsByTutorId = (req, res) => {
    tutorialSessionService.findByTutorId(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            });
        });
};

const deleteSessionById = (req, res) => {
    const sessionId = req.params.id;

    tutorialSessionService.deleteById(sessionId)
        .then(
            response => {
                res.status(200).message('Session deleted successfully');
            },
            error => {
                res.status(404).message('Session not found');
            }
        )
        .catch(error => {
            res.status(404).json({
                error: 'Session not found',
                message: error.message
            });
        });
};

const getAll = (req, res) => {
    tutorialSessionService.findAllWithCourse()
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
};

const create = (req, res) => {
    tutorialSessionService.createSession(req.body)
        .then(response => {
            res.json({ message: 'Session created successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ message: error });
        });
};

const updateById = (req, res) => {
    tutorialSessionService.updateById(req.params.id, req.body)
        .then(session =>
            res.json({
                message: `Updated Session Info ${req.params.id} successfully`
            })
        )
        .catch(error =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
};

module.exports = {
    getAll,
    create,
    updateById,
    getByUniversityId,
    getAllVerifiedByUniversityId,
    getAllRejectedByUniversityId,
    getAllPendingByUniversityId,
    getAllPending,
    getSessionById,
    updateStatusByDocumentId,
    getAllPendingDocuments,
    getSessionsByTutorId,
    deleteSessionById
};
