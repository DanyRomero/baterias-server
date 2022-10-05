const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/", (req, res) => {
  User.find()
    .sort("username")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
});


router.delete("/:id", (req,res) =>{
  const {id} = req.params
  User.findByIdAndDelete(id)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => console.log(err));
})

module.exports = router;
