"use strict";
const express = require("express");
let router = express.Router();
var data = require('./data.js');

router.use(function(req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .route("/data")
  .get((req, res) => {
    res.send("hi get /data/classes");
  })
  .post((req, res) => {
    res.send("hi post /data/classes");
  });

router
  .route("/rooms/:classes")
  .get((req, res) => {
    res.send("hi get /data/classes/" + req.params.carid);
  })
  .put((req, res) => {
    res.send("hi put /data/classes/" + req.params.carid);
  });

module.exports = router;