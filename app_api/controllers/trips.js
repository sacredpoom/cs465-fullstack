const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('users');

const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found1" });
            }
            callback(req, res, user.name);
        } catch (err) {
            console.log(err);
            return res.status(404).json({ message: "User not found2" });
        }
    }
};

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

// GET: single trip identified by trip code
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
    await getUser(req, res, (req, res) => {
        const q = Model.create({
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
    });
};

// PUT: /trips/:tripCode - Updates a new Trip
const tripsUpdateTrip = async(req, res) => {
    await getUser(req, res, (req, res) => {
        try {
            const q = Model.findOneAndUpdate(
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
            ).exec();
            if(!q) {
                // Database returned no data
                return res.status(404).json({ message: "Trip not found" });
            } else {
                // return resulting updated trip
                return res.status(200).json(q);
            }
        } catch (error) {
            console.error("Error updating trip:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteTrip = async (req, res) => {
    await getUser(req, res, async (req, res, userName) => {
        try {
            // Assuming getUser correctly sets req.auth and req.auth is used to validate the user
            if (!req.auth || !req.auth.email) {
                return res.status(403).json({ message: "Unauthorized access" });
            }

            // Perform the delete operation and capture the result
            const result = await Model.findOneAndDelete({'code': req.params.tripCode}).exec();
            console.log("Delete operation result: ", result);
            if (!result) {
                // If no document was found and deleted, return a 404 Not Found
                res.status(404).json({ message: "Trip not found" });
            } else {
                // If the delete was successful, return a 200 OK with some details
                res.status(200).json({ message: "Trip deleted successfully", trip: result });
            }
        } catch (error) {
            console.error("Error deleting trip:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};