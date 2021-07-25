// routes/api/user.js

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
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
 * @route GET api/user/:id
 * @description Get the user with the paramater id
 * @access Public
 */
router.get('/:id', UserController.getUserById);

/**
 * @route GET api/user/session/:id
 * @description Get the sessions of the user with the parameter id
 * @access Public
 */
router.get('/sessions/:id', UserController.getUserSessionsById);

/**
 * @route GET api/user/booked-offerings/:id
 * @description Get the booked offerings of a tutor
 */
router.get('/booked-offerings/:id', UserController.getExperienceRatingByUserId);

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

/**
 * @route PUT api/user/:id/{payload}
 * @description Registers a new mail
 * @access Public
 */
 router.put('/:id', UserController.updateUserById);

module.exports = router;
