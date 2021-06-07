// models/User.js

const mongoose = require('mongoose');

// Define the point schema used for coordinates
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },

    // Careful: GeoJSON uses langtitude before latitude !
    coordinates: {
        type: [Number],
        required: true
    }
});

// Define a city schema used for cities
const citySchema = new mongoose.Schema({
    name: String,
    location: {
        type: pointSchema,
        required: true
    }
});

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
        enum: ['bachelor', 'master'],
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    lastOnline: {
        type: Date,
        required: true
    },
    // We use the location in order to calculate e.g. distance
    // towards an onsite tutorial session
    location: {
        type: citySchema
    },
    role: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        default: 'student'
    }
});

UserSchema.set('versionKey', false);

// adds createdAt, updatedAt properties which are fetched for profile information
UserSchema.set('timestamps', true);

module.exports = User = mongoose.model('user', UserSchema);
