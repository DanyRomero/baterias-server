const router = require("express").Router();
const mongoose = require("mongoose");

const Brand = require("../models/Brand.model");

router.post("/", (req, res) => {
  const { name } = req.body;
  Brand.create({ name })
    .then((newBrand) => {
      res.json(newBrand);
    })
    .catch((err) => {
      res.status(422).json({ errors: err.errors });
    });
});

router.get("/", (req, res) => {
  Brand.find()
    .sort("name")
    .then((brands) => {
      res.json(brands);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Brand.findById(id)
    .then((brand) => {
      res.json(brand);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ error: 'Not found' });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Brand.findByIdAndDelete(id)
    .then((brands) => {
      res.json(brands);
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Brand.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((brands) => {
      res.json(brands);
    })
    .catch((err) => {
      res.status(422).json({ errors: err.errors });
    });
});

module.exports = router;
