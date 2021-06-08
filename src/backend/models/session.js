// models/session.js

const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    startDate: Date,
    endDate: Date,
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    location: {
        type: String,
        enum: ['onsite, remote'],
        required: true
    },
    description: String
});

SessionSchema.set('timestamps', true);

module.exports = Session = mongoose.model('session', SessionSchema);
