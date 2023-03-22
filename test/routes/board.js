var router = require('express').Router();

router.get('/sport', (req, res) => {
    res.send('SPORTS GET request to the homepage')
  });

  router.get('/game', (req, res) => {
    res.send('game GET request to the homepage')
  });


router.use('/vv',require('./sub/tt.js'));

module.exports = router;
