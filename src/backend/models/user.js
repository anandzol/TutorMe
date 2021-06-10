// models/user.js

const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
    // Login happens strictly through email
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'undefined']
    },

    // Semester of the student/tutor, can be used for
    // recommended courses/tutorial sessions
    semester: {
        type: Number,
        min: 1,
        max: 12
    },
    program: {
        type: String,
        enum: ['bachelor', 'master', 'graduate'],
        required: true
    },
    dateOfBirth: Date,
    lastOnline: {
        type: Date,
        required: true
    },
    // We use the location in order to calculate e.g. distance
    // towards an onsite tutorial session
    role: {
        type: String,
        enum: ['student', 'tutor', 'moderator'],
        default: 'student'
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'university'
    }
});

// adds createdAt, updatedAt properties which are fetched for profile information
UserSchema.set('timestamps', true);
UserSchema.set('versionKey', false);

module.exports = User = mongoose.model('user', UserSchema);