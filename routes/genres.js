const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, genre: 'action' },
  { id: 2, genre: 'romance' },
];

router.use('/', genres);
// get all genres
router.get('/', (req, res) => {
  res.send(genres);
});
// get one genre
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} not found`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});
module.exports = router;
