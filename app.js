const express = require("express");
const app = express();
require('dotenv').config();
const db = require('./configs/mongodb');
var bodyParser = require('body-parser')
db.connect();

const cors = require("cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({ origin: true }))

const userRoute = require('./routes/auth')
app.use('/api/users', userRoute)
const songRoute = require('./routes/songs')
app.use('/api/songs', songRoute)
const artistRoute = require('./routes/artists')
app.use('/api/artists', artistRoute)
const albumRoute = require('./routes/albums')
app.use('/api/albums', albumRoute)


app.get("/", (req, res) => {
    res.send('Hi there');
})



app.listen(8000, () => {
    console.log("Listening on port 8000");
})
