const express = require('express'); // Express app
const router = express.Router();    // Router logic
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
});

// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const roomsController = require('../controllers/rooms');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
// DELETE Method routes tripsDeleteTrip - requires parameter
router 
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

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