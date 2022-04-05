const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appt_id: { type: Number, required: true, unique: true },
    appt_name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    notes: { type: String, required: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;