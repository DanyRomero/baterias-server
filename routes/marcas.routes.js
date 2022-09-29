const router = require("express").Router();
const mongoose = require("mongoose")

const Brands = require('../models/Brands.model')

router.post("/", (req,res) =>{
  const {name} = req.body;
  Brands.create({name})
  .then((newBrand) => {
    res.json(newBrand);
  })
  .catch((err) => console.log(err));
})

router.get("/", (req,res) =>{
  Brands.find()
  .then((brands) => {
    res.json(brands);
  })
  .catch((err) => console.log(err));
})


module.exports = router;