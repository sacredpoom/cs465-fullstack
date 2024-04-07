const mongoose = require('mongoose');
const Room = require('../models/travlr');
const Model = mongoose.model('rooms');

// GET list of all rooms
const roomsList = async(req, res) => {
    const q = await Model 
            .find({})
            .exec();

    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET single rooom by code
const roomFindByCode = async(req, res) => {
    const q = await Model
            .find({'code' : req.params.roomCode })
            .exec();

    if(!q)
    { // database returned no data
        return res
                .status(404)
                .json(err);
    } else { // return resulting room
        return res
            .status(200)
            .json(q);
    }
}

module.exports = {
    roomsList,
    roomFindByCode
};