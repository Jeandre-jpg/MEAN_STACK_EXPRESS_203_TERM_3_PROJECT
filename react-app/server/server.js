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
var mongoose   = require('mongoose')
router.route('./api')
router.route('/api/teachers/:id')
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

//     router.route('/api/teachers/:id').get(function(req, res) {
//       Teacher.findById(req.params.id, function(err, teachers) {
//         if (err)
//             res.send(err);
//         res.json(teachers);
//     });
// });

// app.use('/api/teachers/:id', function (req, res, next) {
//   console.log('Request Id:', req.params.id);
//   next();
// });

router.get('/api', function (req, res) {
  res.status(200).json(data);
});

// router.get('api/teachers/:id', function (req, res) {
//   let found = teachers.find(function (item) {
//       return item.id === parseInt(req.params.id);
//   });
//   if (found) {
//       res.status(200).json(found);
//   } else {
//       res.sendStatus(404);
//   }
// });
   


// app.get('/api/teachers/:id', function (req, res, next) {
//   console.log('ID:', req.params.id)
//   next()
// }, function (req, res, next) {
//   res.send('User Info')
// })


app.get('/api/teachers/:id', function (request, response) {
  var teacher = null;
  for (var i = 0; i < data.teachers.length; i++) {
  if (data.teachers[i].id === request.params.id) {
    teacher = data.teachers;
  response.json(teacher);
  }
  }
  if (teacher == null) {
  response.status(404).json("No teacher with id '" +
  request.params.id + "' found.");
  }
  });

// app.get('api/teachers/:id', (req, res) => {
//   var singleTeacher = {}
//   for (teacher of data.teachers) {
//     if (teacher.id == req.params.id){
//       singleTeacher = teacher
//     }
//   }
//   res.json(singleTeacher)
// })


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