// models/offering.js

const mongoose = require('mongoose');

const OfferingsSchema = new mongoose.Schema({
    studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'tutorialSession'},
    offeringDate:Date,
    dateString: String, // work around for timestamp with and without timezones conflict - TODO: use date fn in future for resolution
    availableSlots:Array
});

OfferingsSchema.set('timestamps', true);

module.exports = TutorialSession = mongoose.model(
    'offering',
    OfferingsSchema
);
