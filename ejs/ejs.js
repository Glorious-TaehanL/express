const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.url, req.method);
  req.banana = 'banana';
  next();
});
app.use(
  '/public',
  express.static(path.join(__dirname, 'static', 'index.html'))
);
app.set('view engine', 'ejs');

app
  .get('/', (req, res) => {
    console.log(req.banana);
    res.send('MiddleWare');
  })
  // app
  //   .get('/:userQuery', (req, res) => {
  //     //   res.sendFile(path.join(__dirname, 'static', 'index.html'));
  //     res.render('index', {
  //       data: {
  //         userQuery: req.params.userQuery,
  //         searchResult: ['book1', 'book2', 'book3', 'book4'],
  //         loggedIn: true,
  //         username: 'ted',
  //       },
  //     });
  //   })
  .listen(3000);
