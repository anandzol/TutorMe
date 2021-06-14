const express = require('express');
const router = express.Router();

const TutorialSession = require('../../models/tutorialSession');

/**
 * @route GET api/session/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('session route testing!'));

/**
 * @route GET api/university
 * @description Get all available universities
 * @access Public
 */
router.get('/', (req, res) => {
    TutorialSession.find()
        .then(sessions => res.json(sessions))
        .catch(error =>
            res.status(404).json({
                error: 'No available sessions found',
                message: error.message
            })
        );
});

/**
 * @route POST api/session/{payload}
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

module.exports = router;
