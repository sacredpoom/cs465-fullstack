const express = require('express'); // Express app
const router = express.Router();    // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const roomsController = require('../controllers/rooms');

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router 
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);

// GET Method routes meals endpoint
router 
    .route('/meals')
    .get(mealsController.mealList);

// GET Method routes mealsFindByCode - requires parameter
router
    .route('/meals/:mealCode')
    .get(mealsController.mealsFindByCode);

// GET Method routes rooms endpoint
router 
    .route('/rooms')
    .get(roomsController.roomsList);

// GET Method routes roomFindByCode - requires parameter
router 
    .route('/rooms/:roomCode')
    .get(roomsController.roomFindByCode);

module.exports = router;