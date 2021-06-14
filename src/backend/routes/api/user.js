// routes/api/user.js

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const User = require('../../models/user');
/**
 * @route GET api/user/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('user route testing!'));

/**
 * @route GET api/user
 * @description Get all available users
 * @access Public
 */
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error =>
            res.status(404).json({
                error: 'No available Universities found',
                message: error.message
            })
        );
});
/**
 * @route POST api/user/login/{payload}
 * @description logs into an existing account
 * @access Public
 */
router.post('/login', AuthController.login);

/**
 * @route POST api/user/register/{payload}
 * @description Registers a new mail
 * @access Public
 */
router.post('/register', AuthController.register);

module.exports = router;
