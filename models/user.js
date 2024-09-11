const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    },
    email_verified: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    auth_time: {
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
    { timestamp: true }
);

module.exports = mongoose.model("user", UserSchema);