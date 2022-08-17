const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Vidly, Your friendly neighbourhood video library');
});

module.exports = router;
