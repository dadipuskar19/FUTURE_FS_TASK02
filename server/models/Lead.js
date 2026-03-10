const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, trim: true, default: '' },
        source: {
            type: String,
            enum: ['website', 'referral', 'social_media', 'email_campaign', 'other'],
            default: 'website'
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
            default: 'new'
        },
        notes: [noteSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
