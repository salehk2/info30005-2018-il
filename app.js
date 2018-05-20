const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes.js');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://najimc:najimc123@ds127994.mlab.com:27994/illuminate');

app.use(bodyParser.json());
app.use(express.static('client'));
app.use(router);

app.listen(PORT, function (req, res) {
  console.log(`Listening on port ${PORT}\n`);
});
