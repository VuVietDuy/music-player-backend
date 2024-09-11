const mongoose = require('mongoose');

const songSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        songURL: {
            type: String,
            required: true,
        },
        album: {
            type: String,
        },
        artist: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        category: {
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

module.exports = mongoose.model('song', songSchema);
