// Whenever we find the right API edit the code accordingly

const express = require('express');
const router = express.Router();
require('dotenv').config({path: '../.env'});

//For sending mail we require the sendgrid functionality
const sendmail = require("@sendgrid/mail");
//Setting the API key
sendmail.setApiKey('');

// Will use axios library to query APIs
const axios = require('axios');

// Utils will have whatever helper functions we need
const utils = require('../utils/utils');

//const APP_ID = process.env.APP_ID;
//const APP_KEY = process.env.APP_KEY;
//const API_URL = process.env.API_URL;

let appointment = require('../models/appointment.model');

// Handle POST /app/
router.post('/', (req, res) => {
    console.log("POST /app/");
    let request_body = req.body;


    const App = new appointment({
        appt_name: request_body.appt_name,
        date: new Date(),
        time:request_body.time,
        user_id: request_body.user_id
    });

    App.save()
    .then(data => {
        res.json(data);
        //As of Now whenever you book an appointment a mail will be sent
        //This is the message which we will be sending
        const message={
            to:" ",
            from:" ",
            subject:"hello",
            text:"test",
            html:'<h1>test</h1>',
        };
        //Sending the actual mail
        sendmail.send(message)
        .then(response=> console.log('Email sent...'));
    })
    .catch(err=> {
        console.log(err);
        res.send(err);
    })

});

//Handle GET /app/   (returns all bp records)
router.get('/',async (req,res) => {
    try{
        const allapp=await appointment.find();
        res.json(allapp);
    }
    catch{
        res.json({message: err})
    }
    

});


//Handle DELETE /app/ (Deletes a app INPUT PROVIDED:appt_id)
router.delete('/',async (req, res) => {
    console.log("DELETE /app/");
    const request_body = req.body;
    
    // Delete the app from the database
    appointment.deleteOne({_id: request_body.appt_id}, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({
            message: 'Appointment deleted!'
        });
    });

}); 


module.exports = router;