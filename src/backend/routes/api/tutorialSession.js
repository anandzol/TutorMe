const express = require('express');
const router = express.Router();

const TutorialSession = require('../../models/tutorialSession');
const TutorialSessionController = require('../controllers/tutorialSession');
/**
 * @route GET /api/session/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('session route testing!'));

/**
 * @route GET /api/session
 * @description Get all available tutorial sessions
 * @access Public
 */
router.get('/', (req, res) => {
    TutorialSession.find()
        .populate('course')
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
});

/**
 * @route GET /api/session/:id
 * @description Get a session by its id
 * @access Public
 */
router.get('/:id', TutorialSessionController.getSessionById);

/**
 * @route POST /api/session/{payload}
 * @description
 * @access Public
 */
router.post('/', (req, res) => {
    TutorialSession.create(req.body)
        .then(response => {
            res.json({ message: 'Session created successfully' });
        })
        .catch(error => {
            res.status(400).json({ message: error });
        });
});

/**
 * @route GET api/session/university/:id
 * @description Get all available sessions belonging to a university
 * @access Public
 */
router.get('/university/:id', TutorialSessionController.getByUniversityId);

/**
 * @route GET /api/session/pending
 * @description Get all available sessions which have the status pending
 * @access Public
 */
router.get('/pending', TutorialSessionController.getAllPending);

/**
 * @route GET /api/session/pending/university/:id
 * @description Get all available sessions of a university which have the status pending
 * @access Public
 */
router.get(
    '/pending/university/:id',
    TutorialSessionController.getAllPendingByUniversityId
);

/**
 * @route GET /api/session/verified/university/:id
 * @description Get all available sessions of a university which have the status verified
 * @access Public
 */
router.get(
    '/verified/university/:id',
    TutorialSessionController.getAllVerifiedByUniversityId
);

/**
 * @route GET /api/session/rejected/university/:id
 * @description Get all available sessions of a university which have the status rejected
 * @access Public
 */
router.get(
    '/rejected/university/:id',
    TutorialSessionController.getAllRejectedByUniversityId
);

/**
 * @route GET /api/session/tutor/:id
 * @description Get all sessions of a specific tutor by id
 * @access Public
 */
router.get('/tutor/:id', TutorialSessionController.getSessionsByTutorId);


router.put('/:id', (req, res) => {
    TutorialSession.findByIdAndUpdate(req.params.id, req.body)
        .then(session =>
            res.json({
                message: `Updated Session Info ${req.params.id} successfully`
            })
        )
        .catch(error =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

/**
 * @route DELETE /api/session/:id
 * @description Delete a session by its id
 * @access Public
 */
router.delete('/:id', TutorialSessionController.deleteSessionById);

module.exports = router;
