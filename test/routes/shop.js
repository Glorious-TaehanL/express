const router = require('express').Router();

//route example.

router.get('/shirts', (req, res) => {
  res.send('GET request to the homepage')
});

router.get('/pants', (req, res) => {
  res.send('GET request to the homepage')
});

module.exports = router;