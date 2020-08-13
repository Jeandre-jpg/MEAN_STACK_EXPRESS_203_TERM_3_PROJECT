"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 8000;
var data = require('./data');
var authenticator = require('./authenticator');
var logger = require('./logger');

var urlpath = path.join(__dirname, '../frontend/build');

app.use(logger)

app.use(express.static(urlpath))

app.use(authenticator);

app.param('name', function (request, response, next) {
  request.lowerName = request.params.name.toLowerCase();
  next();
});


app.get('/', function(req, res){
  res.send('Hello world');
})

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


    app.get('/api/teachers/:id/classes/:specClassId',  (request, response) =>{
      var teachersClass = {}
      for (teacher of data.teachers) {
      if (teacher.id == request.params.id) {
        singleTeacher = teacher
        teacher.classes.forEach(classId => {
          data.classes.forEach(classInClasses => {
            if (classInClasses.id == classId){
              if (request.params.specClassId == classInClasses.id) {
                teachersClass = classInClasses
              }
            }
          })
        });
      }
    }
      response.json(teachersClass)
      });


      app.get("/home", (req, res) => {
        res.redirect(301, '/')
      });

      app.post("/api/login", (req, res) => {
       var loginDetails = req.body
       console.log(loginDetails)
       res.json({token: 'Some token here if login successful'})
      });

      app.get('api/protected', authenticator, (req, res) =>{

      })
      
      app.listen(port, err => {
        if (err) {
          return console.log("ERROR", err);
        }
        console.log(`Listening on port ${port}`);
      });


