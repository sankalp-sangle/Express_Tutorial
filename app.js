const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const port = process.env.PORT || 4000;

// This line is needed to allow parsing of HTTP body in json format
app.use(express.json());

// These are our routes
const football = require('./routes/football');
const math = require('./routes/math');
const search = require('./routes/search');
const food = require('./routes/food');

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// routes defined in football will handle all requests to the /football path
app.use('/football', football);
app.use('/math', math);
app.use('/search', search);
app.use('/food', food);

// Top level route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
});
