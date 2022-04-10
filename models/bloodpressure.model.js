const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodPressureSchema = new Schema({
    systolic: { type: Number, required: true, trim: true },
    diastolic: { type: Number, required: true, trim: true },
    time_of_day: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required: true }
}, {
    timestamps: true,
});

const bloodPressure = mongoose.model('bloodPressure', bloodPressureSchema);

module.exports = bloodPressure;