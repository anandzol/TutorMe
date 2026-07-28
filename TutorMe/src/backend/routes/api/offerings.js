const express = require('express');
const router = express.Router();

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
router.post('/', OfferingsController.create);



module.exports = router;
