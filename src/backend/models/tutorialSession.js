// models/offering.js

const mongoose = require('mongoose');

const TutorialSessionSchema = new mongoose.Schema({
    studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'university',
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
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
    description: String,
    status: {
        type: String,
        required: true,
        enum: ['verified', 'pending', 'rejected']
    },
    url: String
});

TutorialSessionSchema.set('timestamps', true);

module.exports = TutorialSession = mongoose.model(
    'tutorialSession',
    TutorialSessionSchema
);
