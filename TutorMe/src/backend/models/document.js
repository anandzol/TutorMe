const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: { type: String },
        fileLink: { type: String },
        s3_key: { type: String },
        tutorialSession: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tutorialSession'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('document', documentSchema);
