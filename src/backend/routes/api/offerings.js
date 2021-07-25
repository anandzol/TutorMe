const express = require('express');
const router = express.Router();

const Offerings = require('../../models/offerings');
const OfferingsController = require('../controllers/offerings');
/**
 * @route GET /api/offering/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('offering route testing!'));


/**
 * @route GET /api/offering/:sessionid
 * @description Get offerings by session id
 * @access Public
 */
router.get('/:sessionid', OfferingsController.getBySessionId);

/**
 * @route POST /api/offering/{payload}
 * @description
 * @access Public
 */
router.post('/', (req, res) => {
    Offerings.create(req.body)
        .then(response => {
            res.json({ message: 'Session created successfully' });
        })
        .catch(error => {
            res.status(400).json({ message: error });
        });
});



module.exports = router;
