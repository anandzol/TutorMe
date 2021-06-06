// models/Book.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
