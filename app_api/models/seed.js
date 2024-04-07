// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const { Trip, Meal, Room } = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));
var meals = JSON.parse(fs.readFileSync('./data/meals.json','utf8'));
var rooms = JSON.parse(fs.readFileSync('./data/room.json','utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Meal.deleteMany({});
    await Room.deleteMany({});
    await Trip.insertMany(trips);
    await Meal.insertMany(meals);
    await Room.insertMany(rooms);
}; 

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});