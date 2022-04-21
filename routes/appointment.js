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
let User = require('../models/user.model');
const cron = require('node-cron');

// Handle POST /app/
router.post('/', (req, res) => {
    console.log("POST /app/");
    let request_body = req.body;


    const App = new appointment({
        appt_name: request_body.appt_name,
        date_of_booking: new Date(),
        date_scheduled: request_body.date_scheduled,
        time:request_body.time,
        user_id: request_body.user_id
    });

    App.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=> {
        console.log(err);
        res.send(err);
    })

});

//Handle GET /app/   (returns all appointment records)
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

cron.schedule('* * * * *', async function() {
    console.log('Running every minute');
    const allapp=await appointment.find();
    const filter_body = {};

    let yyyymmdd = new Date().toISOString().slice(0,10);

    let start_time = yyyymmdd + 'T00:00:00.000Z';
    let end_time = yyyymmdd + 'T23:59:59.999Z';

    filter_body.date_scheduled = {
        $gte: start_time,
        $lte: end_time
    }

    console.log(filter_body);

    // Get all appointments from database with filter_body
    appointment.find(filter_body, (err, appointments) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        // For each appointment, retrieve the user_id.
        appointments.forEach(async (appointment) => {
            console.log("This appointment is scheduled today");
            console.log(appointment);
            const user_id = appointment.user_id;
            // Retrieve the user from the database
            const user = await User.findById(user_id);
            // Retrieve the user's email
            const email = user.email_id;
            console.log(email);

            // Send email to user
            // const message={
            //                 to:email,
            //                 from:" ",
            //                 subject:"You have an appointment!",
            //                 text:appointment.name + " " + appointment.date_scheduled + " " + appointment.time,
            //                 html:'<h1>test</h1>',
            //             }
            // //Sending the actual mail
            // sendmail.send(message)
            // .then(response=> console.log('Email sent...'));
        });
    });
});


module.exports = router;