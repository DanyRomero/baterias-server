const router = require("express").Router();
const mongoose = require("mongoose");

const Order = require("../models/Order.model");

router.post("/", (req, res) => {
  Order.create(req.body)
    .then((order) => res.json(order))
    .catch((err) => {
      console.log(err);
      res.status(422).json({ errors: err.errors });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Order.findById(id)
    .populate({
      path: "model",
      populate: {
        path: "years.batteries",
      },
    })
    .then((order) => res.json(order))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});


router.put("/:id", (req,res)=>{
  const {id} = req.params
  Order.findByIdAndUpdate(id, req.body, {new:true} )
  .then(order=> res.json(order))
  .catch((err)=>{
    res.status(422).json({ errors: err.errors })
  })
})
module.exports = router;
