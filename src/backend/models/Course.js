// models/Course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    university: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);
