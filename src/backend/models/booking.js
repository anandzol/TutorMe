// models/booking.js

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'tutorialSession' },
    courseName: String,
    description: String,
    onsite: Boolean,
    remote: Boolean,
    price: Number,
    inquiry: String,
    startDate: Date,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
