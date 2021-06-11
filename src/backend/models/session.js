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
    date: Date,
    duration: {
        type: Number,
        min: 30,
        max: 120
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    onsite: Boolean,
    remote: Boolean,
    description: String
});

SessionSchema.set('timestamps', true);

module.exports = Session = mongoose.model('session', SessionSchema);
