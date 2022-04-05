const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exercise_id: { type: Number, required: true, unique: true },
    exercise_name: { type: String, required: true, trim: true },
    calories: { type: Number, required: true, trim: true },
    duration: { type: Number, required: true, trim: true },
    date: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;