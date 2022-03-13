// football.js - to answer the questions about football

const express = require('express');
const router = express.Router();

// GET /football/bestteam
router.post('/bestteam', (req, res) => {
    console.log(req.body.name);
    res.send('The best team is Arsenal FC (maybe)');
});

// GET /football/bestplayer
router.get('/bestplayer', (req, res) => {
    res.send('The best player is clearly Martin Odegaard');
});

module.exports = router;