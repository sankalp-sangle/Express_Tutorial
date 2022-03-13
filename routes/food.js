// food.js - Some of these routes query the Edamam API

const express = require('express');
const router = express.Router();

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

// These should be secure, but for now it's fine
const APP_ID = 'c7ff3ef6';
const APP_KEY = 'da8091859f40e7b8f08db56257996412';

const API_URL = 'https://api.edamam.com/api/nutrition-details';

// Handle POST /food/
router.post('/', (req, res) => {
    // Send a POST request to the API url with app_id and app_key as query parameters
    // and request_body as the body of the request
    console.log("POST /food/");
    let request_body = req.body;

    // API needs a list of ingredients. Parse string into list
    request_body.ingr = utils.parseIngr(request_body.ingr);

    axios.post(API_URL + '?app_id=' + APP_ID + '&app_key=' + APP_KEY, request_body)
        .then(response => {
            res.send(response.data);
        }
        ).catch(error => {
            console.log(error);
            res.send(error);
        }
        );
});

module.exports = router;