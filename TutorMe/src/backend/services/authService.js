const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const userRepository = require('../repositories/userRepository');

const login = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password'))
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email'))
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a email property'
        });

    try {
        let user = await userRepository.findByEmail(req.body.email);
        2;
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Email not found'
            });
        }

        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res
                .status(401)
                .send({ token: null, message: 'Invalid password!' });
        }

        const currentTime = new Date();
        user.lastOnline = currentTime;
        await user.save();

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            },
            config.JwtSecret,
            {
                expiresIn: 86400
            }
        );

        return res.status(200).json({
            token: token
        });
    } catch (error) {
        return res.status(404).json({
            error: 'User Not Found',
            message: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let user = req.body;
        user.password = hashedPassword;

        let existingUser = await userRepository.findByEmail(user.email);
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }
        let retUser = await userRepository.create(user);
        const token = jwt.sign(
            {
                _id: retUser._id,
                email: retUser.email,
                role: retUser.role
            },
            config.JwtSecret,
            {
                expiresIn: 86400
            }
        );

        res.status(200).json({
            token: token
        });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({
                error: 'User already exists',
                message: error.message
            });
        } else {
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
};

const me = async (req, res) => {
    try {
        let user = await userRepository.findByEmail(req.userId);

        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

const logout = (req, res) => {
    res.status(200).send({
        token: null
    });
};

module.exports = {
    login,
    register,
    logout,
    me
};
