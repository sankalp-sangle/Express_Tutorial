const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appt_name: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required: true }
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;