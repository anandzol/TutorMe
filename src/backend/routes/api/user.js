// routes/api/user.js

const express = require('express');
const router = express.Router();

// Load User Model
const User = require('../../models/User');

/**
 * @route GET api/user/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('user route testing!'));

/**
 * @route GET api/user
 * @description Get all available user
 * @access Public
 */
router.get('/', (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(error => res.status(404).json({ message: 'No available Users found' }));
});

/**
 * @route GET api/user/:id
 * @description Get single User by id
 * @access Public
 */
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(error =>
            res.status(404).json({ message: `No user with id ${req.params.id} found` })
        );
});

/**
 * @route POST api/user/{payload}
 * @description
 * @access Public
 */
router.post('/', (req, res) => {
    console.log('post api/user/payload');
    User.create(req.body)
        .then(user => res.json({ message: 'user created successfully' }))
        .catch(error => res.status(400).json({ errorMessage: 'Unable to add this user' }));
});

/**
 * @route PUT api/user/:id
 * @description updates a user by id
 * @Access Public
 */
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ message: `Updated user ${req.params.id} successfully` }))
        .catch(error => res.status(400).json({ error: 'Unable to update the Database' }));
});

/**
 * @route DELETE api/boooks/:id
 * @description deletes a user by id
 * @access Public
 */
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
        .then(user =>
            res.json({
                message: `user with id ${req.params.id} deleted successfully`
            })
        )
        .catch(err => res.status(404).json({ error: `No user with id ${req.params.id}` }));
});

module.exports = router;
