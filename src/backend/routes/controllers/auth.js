const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const User = require('../../models/User');

const login = async (req, res) => {
    // Verify wether all necessary properties are contained
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

    // Handle the request
    try {
        let user = await User.findOne({
            email: req.body.email
        }).exec();

        // Check if the user is valid
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Email not found'
            });
        }

        // Check if the password is valid
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ token: null });
        }

        // If user is found and password is valid
        // create a token

        const token = jwt.sign(
            { _id: user._id, mail: user.mail, role: user.role },
            config.JwtSecret,
            {
                // expires in 24 hours
                expiresIn: 86400
            }
        );

        return res.status(200).json({
            token: token
        });
    } catch (error) {
        return res.status(404).json({
            error: 'User Not Found',
            message: err.message
        });
    }
};

const register = async (req, res) => {
    console.log('register');
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let user = req.body;
        user.password = hashedPassword;

        let retUser = await User.create(user);

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
        let user = await User.findById(req.userId).select('email').exec();

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
