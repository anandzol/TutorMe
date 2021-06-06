const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

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
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'undefined']
    },
    semester: {
        type: Number,
        min: 1,
        max: 12
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    program: {
        type: String,
        enum: ['bachelor', 'master'],
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    // We use the location in order to calculate e.g. distance towards an onsite tutorial session
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

module.exports = mongoose.model('User', UserSchema);
