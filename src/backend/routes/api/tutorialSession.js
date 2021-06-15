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
module.exports = router;
