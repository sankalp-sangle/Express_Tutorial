const express = require('express');
const router = express.Router();

let User = require('../models/user.model');

// POST /
router.post('/', async (req, res) => {
    console.log("POST /usersignup");

    // Get the request body
    const request_body = req.body;
    const newUser = new User({
        email_id: request_body.email_id,
        password: request_body.password,
    });

    const response_body = {
        "status": false
    };

    // Create a new user
    await newUser.save(function (err, user) {
        if (err) {
            console.log(err);
            res.json(response_body);
        } else {
            console.log(user._id.toString());
            response_body.status = true;
            res.json(response_body);
        }
    });
});

module.exports = router;