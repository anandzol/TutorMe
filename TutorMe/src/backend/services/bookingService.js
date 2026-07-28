const bookingRepository = require('../repositories/bookingRepository');
const userRepository = require('../repositories/userRepository');
const offeringRepository = require('../repositories/offeringRepository');
const tutorialSessionRepository = require('../repositories/tutorialSessionRepository');
const stripe = require('stripe')(
    'sk_test_51JEzYXFZbrhOEnTQ7O3oK1YqZuepwsQZjDe2F1K1oGPAOetYzyluvMb3rUEXjLTSW6EEYkTrBB4ghBawRpOAkPXH00IS2OtJs5'
);

const bookSession = async (req, res) => {
    let bookingData = req.body;

    // Fetch session details to populate booking with course name and other info
    try {
        const tutorialSession = await tutorialSessionRepository.findByIdWithCourse(bookingData.sessionId);
        if (tutorialSession) {
            bookingData.courseName = tutorialSession.course.name;
            // Extract tutorId - it may be populated as a full object due to the pre-hook
            bookingData.tutorId = tutorialSession.tutorId._id || tutorialSession.tutorId;
            bookingData.description = tutorialSession.description;
        }
    } catch (err) {
        console.error('Error fetching tutorial session:', err);
    }

    bookingRepository.create(bookingData)
        .then(async booking => {
            await Promise.all([
                bookingRepository.findUser(req.body.studentId).then(student => {
                    if (makePayment(req.body.paymentId, req.body.amount)) {
                        booking.paymentStatus = true;
                        student.bookings.push(booking);
                        return student.save();
                    } else {
                        console.error('payment failed');
                    }
                }),
                bookingRepository.findUser(req.body.tutorId).then(tutor => {
                    tutor.bookedOfferings.push(booking);
                    return tutor.save();
                })
            ]);

            let toRemoveAvailableSlot = new Date(req.body.startDate).getHours() + ':00';
            const requestDateString = new Date(req.body.startDate).getFullYear() + '-' + (new Date(req.body.startDate).getMonth() + 1) + '-' + new Date(req.body.startDate).getDate();

            return bookingRepository.findOffering({ sessionId: req.body.sessionId, dateString: requestDateString })
                .then(bookings => {
                    bookings.availableSlots = bookings.availableSlots.filter(item => !toRemoveAvailableSlot.includes(item));
                    return bookings.save();
                })
                .catch(error =>
                    console.error('Error updating offering:', error.message)
                );
        })
        .then(() => {
            res.json({
                message: 'booking created successfully',
                success: true
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        });
};

const rateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const newRating = req.body.rating;

    let currentBooking = await bookingRepository.findById(bookingId);
    if ('rating' in currentBooking) {
        bookingRepository.updateRating(bookingId, newRating).then(
            response => {
                res.status(200).json({
                    message: 'booking created successfully'
                });
            }
        );
    } else {
        bookingRepository.pushRatingArray(bookingId, ratingObject);
    }
};

const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;

    bookingRepository.deleteById(bookingId)
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

const getBookingsByStudent = async (req, res) => {
    const userId = req.params.id;
    userRepository.findByIdWithBookingsAndOfferings(userId)
        .then(user => {
            if (user.role === 'tutor') {
                res.json(user.bookedOfferings);
            } else {
                res.json(user.bookings);
            }
        })
        .catch(error => {
            res.status(404).json({
                error: `No available user with id: ${userId}`,
                message: error.message
            });
        });
};

const getBookingsByTutor = async (req, res) => {
    const userId = req.params.id;
    bookingRepository.findOneByIdWithBookedOfferings(userId)
        .then(user => {
            res.json(user.bookedOfferings);
        })
        .catch(error => {
            res.status(404).json({
                error: `No available user with id: ${userId}`,
                message: error.message
            });
        });
};

const makePayment = async (paymentId, amount) => {
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

const addSlotsUponCancel = async (req, res) => {
    let toAddSlot = new Date(req.body.startDate).getHours() + ":00";
    const requestDateString = new Date(req.body.startDate).getFullYear() + "-" + (new Date(req.body.startDate).getMonth() + 1) + "-" + new Date(req.body.startDate).getDate();
    offeringRepository.findOffering({ sessionId: req.body.sessionId, dateString: requestDateString })
        .then(offerings => {
            offerings.availableSlots.push(toAddSlot);
            offerings.save();
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
    rateBooking,
    deleteBooking,
    getBookingsByStudent,
    getBookingsByTutor
};
