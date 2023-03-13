const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Joi = require('joi');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/', (req, res) => {
  console.log(req.body);
  // const schema = Joi.object().keys({
  //   email: Joi.string().trim().email().required(),
  //   password: Joi.string().min(5).max(10).required(),
  // });
  // res.json({ success: true });
  res.send({ result: true, msg: 'Successfully posted data' });
  // res.sendFile(path.join(__dirname, 'static', 'index2.html'));
  // console.log('page changed');
});

app.listen(3000);
