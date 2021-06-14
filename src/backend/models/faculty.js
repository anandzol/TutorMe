// models/faculty.js

const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'university' },

    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }]
});

module.exports = Faculty = mongoose.model('faculty', FacultySchema);
