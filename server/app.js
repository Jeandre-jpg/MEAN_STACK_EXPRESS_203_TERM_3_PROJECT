"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 8000;
var data = require('./data');






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


      app.get("/", (req, res) => {
      });
      
      app.listen(port, err => {
        if (err) {
          return console.log("ERROR", err);
        }
        console.log(`Listening on port ${port}`);
      });


