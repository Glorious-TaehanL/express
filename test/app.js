const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb');
const methodoverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const { application } = require('express');
let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.use(
  session({
    secret: 'HTRWFRE',
    resave: true,
    saveUninitialized: false,
    useUnifiedTopology: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

var database;

MongoClient.connect(process.env.DB_URL, (err, client) => {
  if (err) {
    console.log(err);
  }
  database = client.db('todoapp');
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT} port.`);
  });
});

app.use(
  '/public',
  express.static(path.join(__dirname, 'public', 'index.html'))
);

app.get('/', (req, res) => {
  //   console.log(req);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/write', (req, res) => {
  res.render('write');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/edit/:id', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'write.html'));
  console.log(req.params);
  if (req.params.id == req.user.id) {
    database
      .collection('post')
      .findOne({ _id: parseInt(req.params.id) }, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send({ message: 'Invalid request' });
        } else {
          res.render('edit', { data: result });
        }
      });
  } else {
    res.redirect('../list');
  }
});

app.get('/list', (req, res) => {
  database
    .collection('post')
    .find()
    .toArray((err, data) => {
      if (!req.user) {
        console.log('login first');
        res.send('please login first');
      } else {
        res.render('list', { posts: data, curUser: req.user._id });
      }
      // console.log(data);
      // console.log(req.user._id);
    });
  //   res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

app.get('/detail/:id', (req, res) => {
  database
    .collection('post')
    .findOne({ _id: parseInt(req.params.id) }, function (err, result) {
      if (err) {
        res.status(404).send({ message: "Oops! we can't find page!!" });
      } else {
        if (result == null) {
          res.status(404).send({ message: "Oops! we can't find page!!" });
        } else {
          res.render('detail', { resultData: result });
        }
      }
    });
});

function loginCheck(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send('Please login first');
  }
}

app.get('/mypage', loginCheck, (req, res) => {
  console.log(req.user);
  res.render('mypage', { user: req.user });
});
app.get('/search', (req, res) => {
  console.log(req.query);
  // database.collection('post').find( { $text : { $search:req.query.value } }).toArray((err,result)=>{
  //     console.log(result);
  //     res.render('search-result',{searchIdx: req.query.value, Data:result});
  // });
  var searchCondition = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.value,
          path: ['title', 'date']
        }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 10 },
    { $project: { title: 1, _id: 1, score: { $meta: 'searchScore' } } }
  ];
  database
    .collection('post')
    .aggregate(searchCondition)
    .toArray((err, result) => {
      console.log(result);
      res.render('search-result', { searchIdx: req.query.value, Data: result });
    });

  // res.render('mypage',{user:req.user});
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail'
  }),
  (req, res) => {
    res.redirect('/mypage');
  }
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'userPassword',
      session: true,
      passReqToCallback: false
    },
    function (ID, PW, done) {
      console.log(ID, PW);
      database.collection('login').findOne({ id: ID }, function (err, result) {
        if (err) return done(err);
        if (!result)
          return done(null, false, {
            message: 'Invalid Id. Please check again'
          });

        if (bcrypt.compareSync(PW, result.password)) {
          return done(null, result);
        } else {
          return done(null, false, { message: '비번틀렸어요' });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (uid, done) {
  //디비에서 유저쩜 아이디로 유저를 찾고 유저정보를 아래에
  // done(null,{요기에 넣음});
  database.collection('login').findOne({ id: uid }, (err, result) => {
    done(null, result);
  });
});

app.post('/add', (req, res) => {
  database.collection('counter').findOne({ name: 'postnum' }, (err, result) => {
    // console.log(result.totalPost);
    var totalPostNum = result.totalPost;
    var saveData = {
      _id: totalPostNum + 1,
      title: req.body.title,
      date: req.body.date,
      auth: req.user._id
    };

    database.collection('post').insertOne(saveData, (err) => {
      if (err) console.log(err);
      else {
        database
          .collection('counter')
          .updateOne(
            { name: 'postnum' },
            { $inc: { totalPost: 1 } },
            (err, result) => {
              if (err) {
                return console.log(err);
              }
            }
          );

        console.log('successfully save data on db');
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
      }
    });
  });
});

app.post('/register', (req, res) => {
  console.log('register posted');
  // database.collection('login').findOne();
  var encryptedPw = bcrypt.hashSync(req.body.userPassword, 10);
  database
    .collection('login')
    .findOne({ id: req.body.userId }, (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        if (result) {
          console.log('Same id');
        } else {
          database
            .collection('login')
            .insertOne(
              { id: req.body.userId, password: encryptedPw },
              (err, result) => {
                if (err) {
                  return console.log(err);
                } else {
                  res.redirect('/');
                }
              }
            );
        }
      }
    });
});

app.put('/edit', (req, res) => {
  database
    .collection('post')
    .update(
      { _id: parseInt(req.body.id) },
      { $set: { title: req.body.title, date: req.body.date } },
      (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          console.log('Successfully updated posted');
          res.redirect('/list');
        }
      }
    );
});

app.delete('/delete', (req, res) => {
  console.log(req.body);
  req.body._id = parseInt(req.body._id);

  var deleteObj = { _id: req.body._id, auth: req.user._id };

  database.collection('post').deleteOne(deleteObj, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      res.status(200).send({ message: 'Successfully deleted request' });
      console.log('Successfully deleted data on db');
    }
  });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('img-file'), function (req, res) {
  res.send('Successfull upload image');
});

app.use('/shop', require('./routes/shop.js'));
app.use('/board/sub', require('./routes/board.js'));
