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
module.exports = router;
