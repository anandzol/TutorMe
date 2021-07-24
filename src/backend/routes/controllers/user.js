// routes/controllers/user.js

const User = require('../../models/user');
const TutorialSession = require('../../models/tutorialSession');
const Booking = require('../../models/booking');
/**
 * API Controller for getting all the necessary information displayed in a tutorial session
 * omits all private information (e.g. lastName, password Hash, Email)
 * @param {Object} req
 * @param {Object} res
 */
const getUserById = async (req, res) => {
    User.find({ _id: req.params.id })
        .populate('image', { _id: 1, name: 1, fileLink: 1 })
        .then(tutor => {
            const data = {
                name: tutor[0].firstName,
                gender: tutor[0].gender,
                dateOfBirth: tutor[0].dateOfBirth,
                lastOnline: tutor[0].lastOnline,
                ratings: tutor[0].ratings,
                image: tutor[0].image
            };
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json({
                error: 'User not found',
                message: error.message
            });
        });
};

/**
 * API Controller for getting all booked tutorial sessions of a user
 * @param {Object} req
 * @param {Object} res
 */
const getUserSessionsById = async (req, res) => {
    User.find({ _id: req.params.id })
        .populate('bookings')
        .then(user => {
            console.log(user);
            const data = {
                bookings: user[0].bookings
            };
            console.log(JSON.stringify(user[0].bookings));
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json({
                error: `User with Id ${req.params.id} not found`,
                message: error.message
            });
        });
};

/**
 * API Controller for booking a tutorial session
 * @param {Object} req
 * @param {Object} res
 */
const bookSession = async (req, res) => {
    const session = req.body;

    Booking.create(session)
        .then(
            booking => {
                User.findOne({ _id: req.body.studentId }).then(student => {
                    student.bookings.push(booking);
                    student.save();
                    console.log(student);
                });

                User.findOne({ _id: req.body.tutorId }).then(tutor => {
                    tutor.bookedOfferings.push(booking);
                    tutor.save();
                    console.log(tutor);
                });

                res.json({ message: 'booking created successfully' });
            },
            error => {
                res.status(404).json({
                    error: 'User not found',
                    message: error.message
                });
            }
        )
        .catch(error => {
            res.status(404).json({
                error: 'Booking creating failed',
                message: error.message
            });
        });
};

module.exports = {
    getUserById,
    getUserSessionsById,
    bookSession
};
