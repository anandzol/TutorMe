// models/course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty' },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'university' },
    offerings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offering' }],
    program: {
        type: String,
        enumeration: ['bachelor', 'master']
    }
});

CourseSchema.set('timestamps', true);

module.exports = Course = mongoose.model('course', CourseSchema);
