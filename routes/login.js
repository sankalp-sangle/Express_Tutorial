const express = require('express');
const router = express.Router();

let User = require('../models/user.model');

// POST /
router.post('/', async (req, res) => {
    console.log("POST /userlogin");

    // Get the request body
    const request_body = req.body;

    const response_body = {
        "status": false
    };

    const user = await User.findOne({
        email_id: request_body.email_id,
        password: request_body.password,
    });

    if (user) {
        response_body.status = true;
        response_body.user_id = user._id.toString();
        res.json(response_body);
    }
    else {
        res.json(response_body);
    }
    
});

module.exports = router;