const User = require('../../models/user');
const Booking = require('../../models/booking');

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

/**
 * API Controller for getting all bookings by a students id
 * @param {Object} req
 * @param {Object} res
 */
const getBookingsByStudentId = async (req, res) => {
    const userId = req.params.id;

    User.findOne({ _id: userId })
        .populate('bookings')
        .then(user => {
            res.json(user.bookings);
        })
        .catch(error => {
            res.status(404).json({
                error: `No available user with id: ${userId}`,
                message: error.message
            });
        });
};

module.exports = {
    bookSession,
    getBookingsByStudentId
};
