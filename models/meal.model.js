const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    meal_name: { type: String, required: true, trim: true },
    calories: { type: Number, required: true, trim: true },
    time_of_day: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    ingr: { type: String, required: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , required: true }
}, {
    timestamps: true,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;