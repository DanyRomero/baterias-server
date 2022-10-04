const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/", (req, res) => {
  User.find()
    .sort("name")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
