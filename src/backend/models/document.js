const mongoose = require('mongoose');

//const AutoIncrement = require('mongoose-sequence')(mongoose);

const documentSchema = new mongoose.Schema(
    {
        // document_id: { type: Number, default: 0 },
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

//documentSchema.plugin(AutoIncrement, { inc_field: 'document_id:' });

module.exports = mongoose.model('document', documentSchema);
