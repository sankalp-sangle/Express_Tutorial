const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

const port = process.env.PORT || 4000;

// This line is needed to allow parsing of HTTP body in json format
app.use(express.json());

app.use(cors());

// These are our routes
const math = require('./routes/math');
const meal = require('./routes/meal');
const signup = require('./routes/signup');
const login = require('./routes/login');

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// routes defined in football will handle all requests to the /football path
app.use('/api/math', math);
app.use('/api/meal', meal);
app.use('/api/usersignup', signup);
app.use('/api/userlogin', login);

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
});
