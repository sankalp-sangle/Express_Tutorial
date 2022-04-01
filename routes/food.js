// food.js - Some of these routes query the Edamam API

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

let Food = require('../models/food.model');

// Handle POST /food/
router.post('/', (req, res) => {
    // Send a POST request to the API url with app_id and app_key as query parameters
    // and request_body as the body of the request
    console.log("POST /food/");
    let request_body = req.body;

    // API needs a list of ingredients. Parse string into list
    request_body.ingr = utils.parseIngr(request_body.ingr);

    const newFood = new Food({
        username: request_body.username,
        ingr: request_body.ingr.join(','),
        calories: -1,
        date: new Date()
    });

    axios.post(API_URL + '?app_id=' + APP_ID + '&app_key=' + APP_KEY, request_body)
        .then(response => {
            // If the response is successful, then save the food to the database
            newFood.calories = response.data.calories;
            newFood.save().
            then(() => console.log('Food added!'))
            .catch(err => console.log('Error: ' + err));
            res.send(response.data);
        }
        ).catch(error => {
            console.log(error);
            res.send(error);
        }
        );
});

module.exports = router;