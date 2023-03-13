const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
  //   res.send('Hello world from nodejs');
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
app.listen(3000);
