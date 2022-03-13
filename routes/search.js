const express = require('express');
const router = express.Router();
let fs = require('fs');

let outputResult = {
    "found": false,
    "state": ""
}

// GET /search
router.get('/', (req, res) => {
    let search = req.body.searchstring;
    console.log(search);
    
    // Read json object from file
    let jsonObject = JSON.parse(fs.readFileSync('./db/citytostates.json'));

    // If jsonObject has the search string, return the state
    if (jsonObject[search]) {
        outputResult.found = true;
        outputResult.state = jsonObject[search];
        res.send(outputResult);
    }
    // If jsonObject does not have the search string, return "Not found"
    else {
        outputResult.found = false;
        outputResult.state = "Not found";
        res.send(outputResult);
    }
});

module.exports = router;