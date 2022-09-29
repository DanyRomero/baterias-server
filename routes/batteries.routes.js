const router = require("express").Router();
const mongoose = require("mongoose")

const Battery = require('../models/Battery.model')

router.post("/", (req,res) =>{
  Battery.create(req.body)
  .then((newBattery) => {
    res.json(newBattery);
  })
  .catch((err) => console.log(err));
})

router.get("/", (req,res) =>{
  Battery.find()
  .then((battery) => {
    res.json(battery);
  })
  .catch((err) => console.log(err));
})

router.delete("/:id", (req,res) =>{
  const { id } = req.params;
  Brand.findByIdAndDelete(id)
  .then((battery) => {
    res.json(battery);
  })
  .catch((err) => console.log(err));
})

router.put("/:id", (req,res) =>{
  const { id } = req.params;
  Brand.findByIdAndUpdate(id, req.body , {new:true})
  .then((battery) => {
    res.json(battery);
  })
  .catch((err) => console.log(err));
})






module.exports = router;