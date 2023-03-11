const express = require('express');
const cors = require('cors');
const app = express();
// app.use(cors());
app.listen(8080, function () {
  console.log('linstening on 8080');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/beauty', function (req, res) {
  res.json({ 'beauty content': 'blabla~' });
});
app.get('/user/:id', function (req, res) {
  const { id } = req.params;
  console.log('id :: ' + id);

  if (id == 'ted') {
    res.json({ content: id });
  } else {
    res.json({ content: 'none' });
  }
});
