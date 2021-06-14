// /models/university.js

const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    faculties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'faculty' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }]
});

module.exports = University = mongoose.model('university', UniversitySchema);
