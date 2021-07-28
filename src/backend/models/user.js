// models/user.js

const mongoose = require('mongoose');

const opts = { toJSON: { virtuals: true } };

// Define the user schema
const UserSchema = new mongoose.Schema(
    {
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
        role: {
            type: String,
            enum: ['student', 'tutor', 'admin'],
            default: 'student'
        },
        languages: [String],
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'document'
        },
        university: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'university'
        },
        adress: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        postalCode: {
            type: String,
            default: ''
        },
        bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booking' }],
        bookedOfferings: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'booking' }
        ]
    },
    opts
);

// UserSchema.pre('findOne', function (next) {
//     this.populate('bookedOfferings', 'startDate rating');
//     next();
// });

UserSchema.virtual('experience').get(function () {
    const currentDate = new Date();

    const previousBookedOfferings = this.bookedOfferings.filter(
        offering => new Date(offering.startDate) < currentDate
    );

    return previousBookedOfferings.length;
});

UserSchema.virtual('averageRating').get(function () {
    const currentDate = new Date();
    const previousBookedOfferings = this.bookedOfferings.filter(
        offering => new Date(offering.startDate) < currentDate
    );
    const ratedOfferings = previousBookedOfferings
        .filter(offering => offering.rating > 0)
        .map(item => item.rating);
    const averageRating =
        ratedOfferings.reduce((acc, val) => acc + val, 0) /
        ratedOfferings.length;
    const averageRatingRounded = Math.round(averageRating * 100) / 100;

    if (typeof averageRatingRounded === 'number') {
        return averageRatingRounded;
    } else {
        return 0;
    }
});

// adds createdAt, updatedAt properties which are fetched for profile information
UserSchema.set('timestamps', true);
UserSchema.set('versionKey', false);
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

module.exports = User = mongoose.model('user', UserSchema);
