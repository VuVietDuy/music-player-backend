const mongoose = require('mongoose');

const artistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        twitter: {
            type: String,
            required: true,
        },
        instagram: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamp: true }
)

module.exports = mongoose.model('artist', artistSchema);
