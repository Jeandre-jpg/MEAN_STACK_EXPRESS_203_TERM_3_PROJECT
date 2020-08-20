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



//A list of all the classes
app.get('/api/classes', function (request, response) {
  if (request.query.limit >= 0) {
  response.json(data.classes.slice(0, request.query.limit));
  } else {
  response.json(data.classes);
  }
  });


  //A list of all the teachers
  app.get('/api/teachers', function (request, response) {
    if (request.query.limit >= 0) {
    response.json(data.teachers.slice(0, request.query.limit));
    } else {
    response.json(data.teachers);
    }
    });


//A list of all the subjects
    app.get('/api/classes/:subject', function (req, res) {
      var subject = req.params.subject;
      var classesId = null;
      for (var i = 0; i < data.classes.length; i++) {
          if (data.classes[i].subject === req.params.subject) {
            classesId = data.classes[i];
              res.json(classesId);
          }
      }
      if (classesId == null) {
          res.status(404).json("No class with id '" + id + "' found.");
      }
  });

//A list of all the teachers by id
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



// app.get('/api/classes/:name/teachers', function (request, response) {
//   var results = [];
//   var lowerName = request.params.name.toLowerCase();
//   for (var i = 0; i < data.teachers.length; i++) {
//   if (data.teachers[i].classes === lowerName) {
//   results.push(data.teachers[i]);
//   }
//   }
//   response.json(results);
//   });


//A list of classes taught by a particular teacher
router.get('api/teachers/:name', (req, res) => {
  let teacherClass = [];
  let myClasses = [];

  for(let i = 0; i < data.teachers.length; i++) {
    if (data.teachers[i].name.toUpperCase() === req.params.name.toUpperCase()) {
      teacherClass.push(data.teachers[i].classes);
    }
  }

  let j = 0;

  for (let i = 0; i < data.classes.length; i++) {
    if (data.classes[i].id === teacherClass[0][j]) {
      myClasses.push (`${data.classes[i].subject} group ${data.classes[i].group}`);
      ++j;
    }
  }

  let teacher = {
    teacher: req.params.name,
    classes: myClasses,
  };

  res.json(teacher);


});

//A list of classes taken by a particular learner
router.get('/api/learners/:name', (req, res) => {
  let learnerClass = [];
  let theirClasses = [];

  for(let i = 0; i < data.learners.length; i++) {
    if (data.learners[i].name.toUpperCase() === req.params.name.toUpperCase()) {
      learnerClass.push(data.learners[i].classes);
    }
  }

  let j = 0;

  for (let i = 0; i < data.classes.length; i++) {
    if (data.classes[i].id === learnerClass[0][j]) {
      theirClasses.push (`${data.classes[i].subject} group ${data.classes[i].group}`);
      ++j;
    }
  }

  let learner = {
    learner: req.params.name,
    classes: theirClasses,
  };

  res.json(learner);


});

// app.get('api/teachers/:id/classes', (req, res) => {
//   var teacherName = '';
//   var teacherNumberClasses = [];
//   var teacherSubjectNames = [];
//   var id = req.params.id;

//   for(var i = 0; i < data.teachers.length; i++) {
//     if (data.teachers[i] === parseInt(id)) {
//       teacherNumberClasses = data.teachers[i].classes;
//       teacherName = data.teachers[i].name;
//     }
//   }

//   for(var i = 0; i < data.classes.length; i++) {
//     if (teacherNumberClasses[i] === data.classes[i].id) {
//       teacherSubjectNames.push(data.classes[i].subject); 
//     }
//   }

//   res.json("Teacher with Id " + id + "is " + teacherName + "whom teaches " + teacherNumberClasses + "classes, named " + teacherSubjectNames)
// });


//A list of all the classes by id
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


//A list of all the classes by id
app.get('/api/classes/:classroom', function (req, res) {
  var classroom = req.params.classroom;
  var classroomId = null;
  for (var i = 0; i < data.classes.length; i++) {
      if (data.classes[i].classroom === req.params.classroom) {
        classroomId = data.classes[i];
          res.json(classroomId);
      }
  }
  if (classroomId == null) {
      res.status(404).json("No class with classroom number '" + classroom + "' found.");
  }
});



router.get('/home', (req, res) => {
  res.redirect(301, '/')
})

router.post('./public/login', (req, res) => {
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