const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
   code: { type: String, required: true, index: true },
   name: { type: String, required: true, index: true },
   length: { type: String, required: true },
   start: { type: Date, required: true },
   resort: { type: String, required: true }, 
   perPerson: { type: String, required: true }, 
   image: { type: String, required: true },
   description: { type: String, required: true }  
});

// Define the meal schema
const mealSchema = new mongoose.Schema({
   code: { type: String, required: true, index: true },
   name: { type: String, required: true, index: true },
   image: { type: String, required: true },
   spanTitle: { type: String, required: true },
   description: { type: String, required: true }
})

// Define the room schema
const roomSchema = new mongoose.Schema({
   code: { type: String, required: true, index: true }, 
   name: { type: String, required: true, index: true },
   image: { type: String, required: true },
   description: { type: String, required: true },
   rate: { type: String, required: true }
});

const Trip = mongoose.model('trips', tripSchema);
const Meal = mongoose.model('meals', mealSchema);
const Room = mongoose.model('rooms', roomSchema);

module.exports = { Trip, Meal, Room };