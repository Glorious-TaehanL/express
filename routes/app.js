const express = require('express');
const path = require('path');
const app = express();

app.use(
  '/public',
  express.static(path.join(__dirname, 'static', 'index.html'))
);
app.set('view engine', 'ejs');

const people = require('./people.js');

app.use('/people', people);
app.listen(3000);
