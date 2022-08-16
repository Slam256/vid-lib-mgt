const express = require('express');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const genres = [
  { id: 1, genre: 'action' },
  { id: 2, genre: 'romance' },
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidly, Your friendly neighbourhood video library');
});
// get all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});
// get one genre
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} not found`);
  res.send(genre);
});
// Validation function
function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });
  return schema.validate({ genre: genre.genre });
}
// add a genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(genre);
  res.send(genre);
});
// update a genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} not found`);

  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  genre.genre = req.body.genre;
  res.send(genre);
});
// delete a genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} not found`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
