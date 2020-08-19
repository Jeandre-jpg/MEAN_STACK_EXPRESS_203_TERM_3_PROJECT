  
const path = require("path");
const express = require("express");
const app = express(); 
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');

app.use(stormpath.init(app, {
  web: {
    produces: ['./package.json']
  }
}));


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "./server/public/index.html"));
});



app.on('stormpath.ready', function () {
  app.listen(8000, 'localhost', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Listening at http://localhost:8000');
  });
});