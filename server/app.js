"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 8000;
var data = require('./data');
const session = require('express-session');
var bodyparser = require("body-parser");
var User = require('../models/User');
var mongoose = require("mongoose");
var db = require("../mysetup/myurl").myurl;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });


app.use(passport.initialize());

require("./strategies/jsonwtStrategy")(passport);

app.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the Login and Signup API`);
});

const profile = require("./routes/User");
app.use("/api", profile);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
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




