const User = require('../../models/user');
const Booking = require('../../models/booking');

/**
 * API Controller for booking a tutorial session
 * @param {Object} req
 * @param {Object} res
 */
const bookSession = async (req, res) => {
    let session = req.body;
    Booking.create(session)
        .then(
            booking => {
                // Update the booking of the student
                User.findOne({ _id: req.body.studentId }).then(student => {
                    student.bookings.push(booking);
                    student.save();
                });

                // Update the booking of the tutor
                User.findOne({ _id: req.body.tutorId }).then(tutor => {
                    tutor.bookedOfferings.push(booking);
                    tutor.save();
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
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        });
};

/**
 * API Controller for rating a booking.
 * @param {Object} req
 * @param {Object} res
 */
const rateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const newRating = req.body.rating;

    let currentBooking = await Booking.findOne({ _id: bookingId });
    if ('rating' in currentBooking) {
        Booking.updateOne({ _id: bookingId }, { rating: newRating }).then(
            response => {
                res.status(200).json({
                    message: 'booking created successfully'
                });
            }
        );
    } else {
        Booking.findByIdAndUpdate(bookingId, {
            $push: { rating: ratingObject }
        });
    }
};

const deleteBookingById = async (req, res) => {
    const bookingId = req.params.id;

    Booking.findOneAndDelete({ _id: bookingId })
        .then(
            response => {
                res.status(200).message('Booking deleted successfully');
            },
            error => {
                res.status(404).message('Booking not found');
            }
        )
        .catch(error => {
            res.status(404).json({
                error: 'Booking not found',
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
        .populate({
            path: 'bookings',
            populate: {
                path: 'tutorId'
            }
        })
        .then(user => {
            res.json(user.bookings);
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({
                error: `No available user with id: ${userId}`,
                message: error.message
            });
        });
};

module.exports = {
    bookSession,
    getBookingsByStudentId,
    rateBooking,
    deleteBookingById
};
