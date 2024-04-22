const mongoose = require('mongoose');
const Meal = require('../models/travlr');
const Model = mongoose.model('meals');

// GET list of all meals
const mealList = async(req, res) => {
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

// GET single meal by code
const mealsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.mealCode }) 
        .exec();

    if(!q)
    { // database returned no data
        return res   
                .status(404)
                .json(err);
    } else { // return resulting meal
        return res 
                .status(200)
                .json(q);
    }
};

module.exports = {
    mealList,
    mealsFindByCode
};