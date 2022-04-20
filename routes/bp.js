// Whenever we find the right API edit the code accordingly

const express = require('express');
const router = express.Router();
require('dotenv').config({path: '../.env'});

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

//const APP_ID = process.env.APP_ID;
//const APP_KEY = process.env.APP_KEY;
//const API_URL = process.env.API_URL;

let bloodPressure = require('../models/bloodpressure.model');

// Handle POST /bp/
router.post('/', (req, res) => {
    console.log("POST /bp/");
    let request_body = req.body;


    const bloodpressure = new bloodPressure({
        systolic: request_body.systolic,
        diastolic: request_body.diastolic,
        time_of_day: request_body.time_of_day,
        date: new Date(),
        user_id: request_body.user_id
    });

    bloodpressure.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=> {
        console.log(err);
        res.send(err);
    })

});

//Handle GET /bp/   (returns all bp records)
router.get('/',async (req,res) => {
    console.log("GET /bp/");
    
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

    // Get all bp readings from the database that satisfy the query
    bloodPressure.find(filter_body, (err, bps) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(bps);
    })
});

//Handle DELETE /bp/ (Deletes a bp record INPUT PROVIDED:bp_id)
router.delete('/',async (req, res) => {
    console.log("DELETE /bp/");
    const request_body = req.body;
    
    // Delete the meal from the database
    bloodPressure.deleteOne({_id: request_body.bp_id}, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({
            message: 'BP deleted!'
        });
    });
}); 

//Handle PUT /bp/ (Updates a bp record INPUT PROVIDED:bp_id and whatever needs to be updated) 
router.put("/:id", (req, res, next) => {
    let request_body = req.body;
    return bloodPressure.updateOne(
      { bloodpressure_id: req.params.id },  // <-- find stage
      { $set: {                // <-- set stage
        systolic: request_body.systolic,
        diastolic: request_body.diastolic,
        } 
      }   
    ).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });


module.exports = router;