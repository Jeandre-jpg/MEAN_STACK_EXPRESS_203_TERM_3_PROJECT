var path = require('path')
require('dotenv').config()
var express = require('express')
var app = express()
var port = 8080
var cors = require('cors')
var authenticator = require('./authenticator')
var logger = require('../server/loger')
var data = require('../server/data')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
var router = express.Router()
app.use('/api', router)
app.use(express.json())
const axios = require('axios').default


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
// app.get('/', (req, res) => res.download('./server/src/MEAN-ExpressJS-203-Brief-2020.pdf'));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


var urlpath = path.join(__dirname, './server/public/')
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

// //A list of all the classes
app.get('/api/classes', function (request, response) {
  if (request.query.limit >= 0) {
  response.json(data.classes.slice(0, request.query.limit));
  } else {
  response.json(data.classes);
  }
  });


  //   //A list of all the teachers
  app.get('/api/teachers', function (request, response) {
    if (request.query.limit >= 0) {
    response.json(data.teachers.slice(0, request.query.limit));
    } else {
    response.json(data.teachers);
    }
    });



// //A list of all the subjects
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





// //A list of classes taught by a particular teacher
app.get('/api/teachers/:id/classes', (req, res) => {
  var teacherName = [];
  var classId = [];
  var className = [];

  var id = req.params.id;

  for (var i = 0; i < data.teachers.length; i++) {
    if (data.teachers[i].id === parseInt(id)) {
      teacherName.push(data.teachers[i].name);
      for (var j = 0; j < data.teachers[i].classes.length; j++){
        classId.push(data.teachers[i].classes[j])
    }
  }
}


for (var i = 0; i < classId.length; i++) {
    for (var j = 0; j < data.classes.length; j++){
        if (classId[i] == data.classes[j].id) {
          className.push(data.classes[j].subject);
      }
    }
}

var results = {teacherName, className};
res.json(results);

});





// //A list of classes that is being taken by a learner
app.get('/api/learners/:id/classes', (req, res) => {
  var learnerName = [];
  var classId = [];
  var className = [];

  var id = req.params.id;

  for (var i = 0; i < data.learners.length; i++) {
    if (data.learners[i].id === parseInt(id)) {
      learnerName.push(data.learners[i].name);
      for (var j = 0; j < data.learners[i].classes.length; j++){
        classId.push(data.learners[i].classes[j])
    }
  }
}


for (var i = 0; i < classId.length; i++) {
    for (var j = 0; j < data.classes.length; j++){
        if (classId[i] == data.classes[j].id) {
          className.push(data.classes[j].subject);
      }
    }
}

var results = {learnerName, className};
res.json(results);

});



//Details of a class
app.get('/api/classes/:id/classes', (req, res) => {
  var classRoomNumber = [];
  var subjectName = [];
  var slotNumber = [];
  var studentName = [];
  var teachName = [];
  var detailsId = [];

  var id = req.params.id;

  for (var i = 0; i < data.classes.length; i++) {
    if (data.classes[i].id === parseInt(id)) {
        slotNumber.push(data.classes[i].slot);
        subjectName.push(data.classes[i].subject[j])
        classRoomNumber.push(data.classes[i].classroom[j])
    }
  }



for (var i = 0; i < data.slotNumber.length; i++) {
        if (data.slotNumber[i].slot == (parseInt(id))) {
          classTime.push(data.slots[j].times);
      }
    }

    for (var i = 0; i < data.teachName.length; i++) {
      for (var j = 0; j < data.teachName.classes.length; j++){
        detailsId.push(data.learners[i].classes[j])
    }  if (data.teachName[i].className[j] == (parseInt(id))) {
      teachName.push(data.teachName[i].name);
  }
    
  }


  for (var i = 0; i < data.studentName.length; i++) {
    for (var j = 0; j < data.studentName.classes.length; j++){
      detailsId.push(data.learners[i].classes[j])
  }  if (data.studentName[i].className[j] == (parseInt(id))) {
    studentName.push(data.studentName[i].name);
}
  
}


var results = {subjectName, classRoomNumber, teachName, studentName, slotNumber};
res.json(results);

});





router.get('/home', (req, res) => {
  res.redirect(301, '/')
})

router.post('/api/login', (req, res) => {
  var loginDetails = req.body
  console.log(loginDetails)
  res.json(loginDetails)
})



//   const token = jwt.sign({ "name": "Jeandré De Villiers", "id": "190025" }, process.env.ACCESS_TOKEN_SECRET)
//   res.cookie("token", token)
//   res.json({ token: token })
// })

// router.post('/api/protected', authenticator, (req, res) => {
//   res.json(req.user)
// })




const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})