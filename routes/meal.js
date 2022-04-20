// meal.js - Some of these routes query the Edamam API

const express = require('express');
const router = express.Router();
require('dotenv').config({path: '../.env'});

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

// These should be secure, but for now it's fine
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
const API_URL = process.env.API_URL;

let Meal = require('../models/meal.model');

// Handle POST /meal/
router.post('/', (req, res) => {
    // Send a POST request to the API url with app_id and app_key as query parameters
    // and request_body as the body of the request
    console.log("POST /meal/");
    let request_body = req.body;

    // API needs a list of ingredients. Parse string into list
    request_body.ingr = utils.parseIngr(request_body.ingr);

    const newMeal = new Meal({
        meal_name: request_body.title,
        calories: -1,
        time_of_day: request_body.time_of_day,
        date: new Date(),
        ingr: request_body.ingr.join(','),
        user_id: request_body.user_id
    });

    const edamam_request_body = {
        "title": request_body.meal_name,
        "ingr": request_body.ingr
    };

    axios.post(API_URL + '?app_id=' + APP_ID + '&app_key=' + APP_KEY, edamam_request_body)
        .then(response => {
            // If the response is successful, then save the meal to the database
            newMeal.calories = response.data.calories;
            newMeal.save().
            then((data) => {
                console.log('Meal added!');
                res.json(data);
            })
            .catch(err => console.log('Error: ' + err));
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        }
        ); 
});

//Handle GET /meal/   (returns all meals)
router.get('/',async (req,res) => {
    console.log("GET /meal/");
    
    const request_body = req.body;
    const filter_body = {}

    if (request_body.user_id) {
        filter_body.user_id = request_body.user_id;
    }
    if (request_body.date) {
        filter_body.date = {
            $gte: request_body.date + 'T00:00:00.000Z',
            $lte: request_body.date + 'T23:59:59.999Z'
        }
    }

    // Get all meals from the database that satisfy the query
    Meal.find(filter_body, (err, meals) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(meals);
    })
    

});

//Handle DELETE /meal/ (Deletes a meal INPUT PROVIDED:meal_id)
router.delete('/',async (req, res) => {
    console.log("DELETE /meal/");
    const request_body = req.body;
    
    // Delete the meal from the database
    Meal.deleteOne({_id: request_body.meal_id}, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({
            message: 'Meal deleted!'
        });
    });

}); 

//Handle PUT /meal/ (Updates a meal INPUT PROVIDED:meal_id and whatever needs to be updated) 
router.put("/:id", (req, res, next) => {
    let request_body = req.body;
    request_body.ingr = utils.parseIngr(request_body.ingr);
    return Meal.updateOne(
      { meal_id: req.params.id },  // <-- find stage
      { $set: {                // <-- set stage
        meal_id: request_body.meal_id,
        meal_name: request_body.title,
        time_of_day: request_body.time_of_day,
        ingr: request_body.ingr.join(','),
        calories: -1,
        date: new Date(),
        } 
      }   
    ).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });


module.exports = router;