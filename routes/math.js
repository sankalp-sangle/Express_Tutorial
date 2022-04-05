// Export a function that takes an integer and squares it and returns the result
// as an integer.

const express = require('express');
const router = express.Router();

// GET /math/square
router.get('/square/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const result = number * number;
    res.send(`The square of ${number} is ${result}`);
});

// GET /math/cube
router.get('/cube/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const result = number * number * number;
    res.send(`The cube of ${number} is ${result}`);
});

module.exports = router;