const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DBconnection = require('./db');
const chaptersRoute = require('./routes/chapters.route');

const app = express();
const apiPort = 5003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

DBconnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/books', chaptersRoute);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));