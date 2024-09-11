const mongoose = require('mongoose');

const albumSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
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
    { timestamps: true }
);

module.exports = mongoose.model('album', albumSchema);
