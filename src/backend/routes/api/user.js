// routes/api/user.js

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

/**
 * @route GET api/user/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('user route testing!'));

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
