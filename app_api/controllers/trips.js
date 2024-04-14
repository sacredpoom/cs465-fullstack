const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query 
        // on the console
        // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res 
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();

    if(!q)
    { // Database returned no data
        return res   
            .status(404)
            .json(err);
    } else { // Return resulting trip
        return res 
            .status(200)
            .json(q);
    }
};

// POST adds new trip to database
const tripsAddTrip = async (req, res) => {
    const q = await Model.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    })
      .then((data) => {
        res.send(data);
      })
    .catch((err) => {
      res.send(err);
    });
};

// PUT: /trips/:tripCode - Adds a new Trip
const tripsUpdateTrip = async(req, res) => {
    const q = await Model
      .findOneAndUpdate(
        {'code': req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
      )
      .exec();

      if(!q)
      {
        return res
            .status(400)
            .json(err);
      } else {
        return res
          .status(201)
          .json(q);
      }
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const result = await Model.findOneAndDelete({ code: req.params.tripCode });
        if (!result) { // No document found to delete
            return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
        }
        res.status(200).json({ message: "Trip deleted successfully", trip: result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting trip", error: error });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};