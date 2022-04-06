const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;