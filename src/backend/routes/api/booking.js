const express = require('express');
const router = express.Router();

const Booking = require('../../models/booking');
const BookingController = require('../controllers/booking');

/**
 * @route POST api/booking/book-session
 * @description Book a session with the payload
 * @access Public
 */
router.post('/book-session', BookingController.bookSession);

/**
 * @route GET api/booking/student/:id
 * @description
 * @access
 */
router.get('/student/:id', BookingController.getBookingsByStudentId);

/**
 * @route GET /api/session/test
 * @description test route
 * @access Public
 */
router.get('/test', (req, res) => res.send('session route testing!'));

/**
 * @route GET api/booking
 * @description Get all available bookings
 * @access Public
 */
router.get('/', (req, res) => {
    Booking.find()
        .then(bookings => res.json(bookings))
        .catch(error =>
            res.status(404).json({ message: 'No available Bookings found' })
        );
});

/**
 * @route POST api/booking/rate/:id
 * @description Rate a booking
 * @access Public
 */
router.post('/rate/:id', BookingController.rateBooking);

module.exports = router;
