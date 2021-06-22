// models/booking.js

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'tutorialSession' },
    courseName: String,
    description: String,
    onsite: Boolean,
    price: Number,
    inquiry: String,
    startDate: Date
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
