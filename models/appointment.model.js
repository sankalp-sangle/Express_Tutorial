const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appt_name: { type: String, required: true, trim: true },
    date_of_booking: { type: Date, required: true, trim: true },
    date_scheduled: { type: Date, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required: true }
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;