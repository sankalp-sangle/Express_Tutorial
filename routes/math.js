// Export a function that takes an integer and squares it and returns the result
// as an integer.

const express = require('express');
const router = express.Router();

// GET /math/square
router.get('/square', (req, res) => {
    res.send("The square of " + req.body.num + " is " + (req.body.num * req.body.num));
});

// GET /math/cube
router.get('/cube', (req, res) => {
    res.send("The cube of " + req.body.num + " is " + (req.body.num * req.body.num * req.body.num));
});

module.exports = router;