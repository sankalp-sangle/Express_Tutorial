// Whenever we find the right API edit the code accordingly

const express = require('express');
const router = express.Router();
require('dotenv').config({path: '../.env'});

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
const API_URL = process.env.API_URL;

let Exercise = require('../models/exercise.model');

// Handle POST /exercise/
router.post('/', (req, res) => {
    console.log("POST /exercise/");
    let request_body = req.body;


    const exercise = new Exercise({
        exercise_id: request_body.exercise_id,
        exercise_name: request_body.title,
        duration: request_body.duration,
        date: new Date(),
    });

        exercise.save()
        .then(data => {
            res.json(data);
        })
        .catch(err=> {
            console.log(err);
            res.send(err);
        })

});

//Handle GET /exercise/   (returns all exercise)
router.get('/',async (req,res) => {
    try{
        const allexercise=await Exercise.find();
        res.json(allexercise);
    }
    catch{
        res.json({message: err})
    }
    

});

//Handle DELETE /exercise/ (Deletes a exercise INPUT PROVIDED:exercise_id)
router.delete('/',async (req, res) => {
    try{
        const removedexercise= await Exercise.remove( { exercise_id : req.body.exercise_id } );
        res.json(removedexercise);
    }
    catch{
        res.json({message: err})
    }
}); 

//Handle PUT /exercise/ (Updates a exercise INPUT PROVIDED:exercise_id and whatever needs to be updated) 
router.put("/:id", (req, res, next) => {
    let request_body = req.body;
    return Exercise.updateOne(
      { exercise_id: req.params.id },  // <-- find stage
      { $set: {                // <-- set stage
        exercise_id: request_body.exercise_id,
        exercise_name: request_body.title,
        duration: request_body.duration,
        } 
      }   
    ).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });


module.exports = router;