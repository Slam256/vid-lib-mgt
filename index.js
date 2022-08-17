const express = require('express');
const Joi = require('joi');
require('dotenv').config();
const home = require('./routes/home');
const genres = require('./routes/genres');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', home);
app.use('/api/genres', genres);

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
