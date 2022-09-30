const router = require("express").Router();
const mongoose = require("mongoose")

const Brand = require('../models/Brand.model')

router.post("/", (req,res) =>{
  const {name} = req.body;
  Brand.create({name})
  .then((newBrand) => {
    res.json(newBrand);
  })
  .catch((err) => console.log(err));
})

router.get("/", (req,res) =>{
  Brand.find().sort("name")
  .then((brands) => {
    res.json(brands);
  })
  .catch((err) => console.log(err));
})

router.delete("/:id", (req,res) =>{
  const { id } = req.params;
  Brand.findByIdAndDelete(id)
  .then((brands) => {
    res.json(brands);
  })
  .catch((err) => console.log(err));
})

router.put("/:id", (req,res) =>{
  const { id } = req.params;
  Brand.findByIdAndUpdate(id, req.body , {new:true})
  .then((brands) => {
    res.json(brands);
  })
  .catch((err) => console.log(err));
})


module.exports = router;