"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 8000;
var data = require('./data');
var learner = require('./data');


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

    // app.get('/api/teachers/:id', function (request, response) {
    //   var teachers = null;
    //   for (var i = 0; i < data.teachers.length; i++) {
    //   if (data.teachers[i].id === request.params.id) {
    //     teachers = data.teachers[i];
    //   response.json(data.teachers[i]);
    //   }
    //   }
    //   if (teachers == null) {
    //   response.status(404).json("No room named '" +
    //   request.params.id + "' found.");
    //   }
    //   });

    app.get('/api/classes/:classroom', function (request, response) {
      var class1 = null;
      for (var i = 0; i < data.classes.length; i++) {
      if (data.classes[i].classroom === request.params.classroom) {
        class1 = data.classes[i];
      response.json(data.classes[i]);
      }
      }
      if (class1 == null) {
      response.status(404).json("No class in classroom '" +
      request.params.classroom + "' found.");
      }
      });


        app.get('/api/teachers/:id/classes', function (request, response) {
          var classes = request.params.classes;
          var teachers = null;
          for (var i = 0; i < data.teachers.length; i++) {
          if (data.teachers[i].classes === parseInt(classes)) {
            teachers = data.teachers[i];
          response.json(teachers);
          }
          }
          if (teachers == null) {
          response.status(404).json("No teachers with classes '" + classes + "found.");
          }
          });


          app.get('/api/learners/:classes', function (request, response) {
            var learner = null;
            for (var i = 0; i < data.learners.length; i++) {
            if (data.learners[i].classes === request.params.classes) {
              learner = data.learners[i];
            response.json(data.learners[i]);
            }
            }
            if (learner == null) {
            response.status(404).json("No learners in classes '" +
            request.params.classes + "' found.");
            }
            });
      

          // app.get('/api/teachers/:id/classes', function (request, response) {
          //   var results = [];
          //   var lowerName = request.params.id.toLowerCase();
          //   for (var i = 0; i < data.classes.length; i++) {
          //   if (data.classes[i].teachers === lowerName) {
          //   results.push(data.classes[i]);
          //   }
          //   }
          //   response.json(results);
          //   });


          app.get('/api/classes/:slots/times', function (request, response) {
            var classes = request.params.times;
            var teachers = null;
            for (var i = 0; i < data.teachers.length; i++) {
            if (data.teachers[i].times === parseInt(times)) {
              teachers = data.teachers[i];
            response.json(teachers);
            }
            }
            if (teachers == null) {
            response.status(404).json("No teachers with times '" + times + "found.");
            }
            });


app.get("/", (req, res) => {
});

app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});
