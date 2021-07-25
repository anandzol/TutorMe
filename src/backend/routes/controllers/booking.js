const User = require('../../models/user');
const Booking = require('../../models/booking');
const Offering = require('../../models/offerings');

// Secret key for identification for stripe
const stripe = require('stripe')(
    'sk_test_51JEzYXFZbrhOEnTQ7O3oK1YqZuepwsQZjDe2F1K1oGPAOetYzyluvMb3rUEXjLTSW6EEYkTrBB4ghBawRpOAkPXH00IS2OtJs5'
);

/**
 * API Controller for booking a tutorial session
 * @param {Object} req
 * @param {Object} res
 */
const bookSession = async (req, res) => {
    let session = req.body;
    // New bookings being created each time without any check!
    Booking.create(session)
        .then(
            booking => {
                // Update the booking of the student
                User.findOne({ _id: req.body.studentId }).then(student => {
                    // payment
                    if (makePayment(req.body.paymentId, req.body.amount)) {
                        booking.paymentStatus = true;
                        student.bookings.push(booking);
                        student.save();
                    } else {
                        console.error('payment failed');
                    }
                });

                // Update the booking of the tutor
                User.findOne({ _id: req.body.tutorId }).then(tutor => {
                    tutor.bookedOfferings.push(booking);
                    tutor.save();
                });

                                // once the offerings are pushed , the slot is removed from offerings model.
                                let toRemoveAvailableSlot = new Date(req.body.startDate).getHours()+":00";
                
                                const requestDateString = new Date(req.body.startDate).getFullYear()+"-"+(new Date(req.body.startDate).getMonth()+1)+"-"+new Date(req.body.startDate).getDate();
                                const all=Offering.findOne({sessionId: req.body.sessionId,dateString:requestDateString}).populate('booking')
                                .sort({ updatedAt: -1 })
                                .then(bookings => {
                                    //console.log('found following sessions-',bookings);
                                    bookings.availableSlots=bookings.availableSlots.filter(item => !toRemoveAvailableSlot.includes(item));
                                    bookings.save();
                                    // console.log("after slot removal-",bookings.availableSlots);
                                    //res.json(sessions)
                                })
                                .catch(error =>
                                    res.status(404).json({
                                        error: 'No available sessions found',
                                        message: error.message
                                    })
                                );

                res.json({
                    message: 'booking created successfully',
                    success: true
                });
            },
            error => {
                res.status(404).json({
                    error: 'User not found',
                    message: error.message
                });
            }
        )
        .catch(error => {
            console.log(error);
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
            res.status(404).json({
                error: `No available user with id: ${userId}`,
                message: error.message
            });
        });
};

// PaymentIntent represents your intent to collect payment from a customer and tracks the lifecycle of the payment process.
const makePayment = async (paymentId, amount) => {
    // Create the PaymentIntent
    try {
        let intent = await stripe.paymentIntents.create({
            payment_method: paymentId,
            description: 'Test payment',
            amount: amount * 100,
            currency: 'eur',
            confirmation_method: 'manual',
            confirm: true
        });
        if (intent.status == 'succeeded') return true;
        else return false;
    } catch (e) {
        console.error('error', e.message);
    }
};

module.exports = {
    bookSession,
    getBookingsByStudentId,
    rateBooking,
    deleteBookingById
};
