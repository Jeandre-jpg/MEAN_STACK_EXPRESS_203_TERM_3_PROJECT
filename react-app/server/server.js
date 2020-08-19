var path = require('path')
require('dotenv').config()
var express = require('express')
var app = express()
var port = 8000
var cors = require('cors')
var authenticator = require('./authenticator')
var logger = require('../server/loger')
var data = require('../server/data')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
var router = express.Router()
app.use('/api', router)


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


var urlpath = path.join(__dirname, './server/public/index.html')
// app.use(cors(corsOptions))
//1.
app.use(logger)
app.use(cors(corsOptions))
//2.
app.use(express.static(urlpath))
//3.
app.use(cookieParser())
app.use(bodyParser.json())
// app.use(authenticator);
//4.
app.param('name', function (request, response, next) {
  request.lowerName = request.params.name.toLowerCase();
  next();
});


app.get('/api/classes', function (request, response) {
  if (request.query.limit >= 0) {
  response.json(data.classes.slice(0, request.query.limit));
  } else {
  response.json(data.classes);
  }
  });

  app.get('/api/teachers', function (request, response) {
    if (request.query.limit >= 0) {
    response.json(data.teachers.slice(0, request.query.limit));
    } else {
    response.json(data.teachers);
    }
    });






app.get('/api/teachers/:id', function (req, res) {
    var id = req.params.id;
    var teacherId = null;
    for (var i = 0; i < data.teachers.length; i++) {
        if (data.teachers[i].id === parseInt(id)) {
          teacherId = data.teachers[i];
            res.json(teacherId);
        }
    }
    if (teacherId == null) {
        res.status(404).json("No class with id '" + id + "' found.");
    }
});
app.get('/api/classes/:name/teachers', function (request, response) {
  var results = [];
  var lowerName = request.params.name.toLowerCase();
  for (var i = 0; i < data.teachers.length; i++) {
  if (data.teachers[i].classes === lowerName) {
  results.push(data.teachers[i]);
  }
  }
  response.json(results);
  });


app.get('/api/classes/:id', function (req, res) {
    var id = req.params.id;
    var classId = null;
    for (var i = 0; i < data.classes.length; i++) {
        if (data.classes[i].id === parseInt(id)) {
            classId = data.classes[i];
            res.json(classId);
        }
    }
    if (classId == null) {
        res.status(404).json("No class with id '" + id + "' found.");
    }
});







router.get('/home', (req, res) => {
  res.redirect(301, '/')
})

router.post('.public/login', (req, res) => {
  var loginDetails = req.body
  console.log(loginDetails)

  const token = jwt.sign({ "name": "Jeandré De Villiers", "id": "190025" }, process.env.ACCESS_TOKEN_SECRET)
  res.cookie("token", token)
  res.json({ token: token })
})

router.post('/api/protected', authenticator, (req, res) => {
  res.json(req.user)
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})