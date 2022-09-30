const router = require("express").Router();
const mongoose = require("mongoose");

const Model = require("../models/Model.model");
const Brand = require("../models/Brand.model");

router.post("/", (req, res) => {
  const { name, brandId } = req.body;
  Model.create({ name, brand: brandId})
    .then((newModel) => {
      return Brand.findByIdAndUpdate(brandId, { $push: { models: newModel._id } } );
    })
    .then(response => res.json(response))
    .catch((err) => {
      res.status(422).json({ errors: err.errors })
      });
});

router.get("/", (req, res) => {
  Model.find()
    .sort("name")
    .then((models) => {
      res.json(models);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Model.findById(id)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ error: 'Not found' });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Model.findByIdAndDelete(id)
    .then((models) => {
      res.json(models);
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((models) => {
      res.json(models);
    })
    .catch((err) => {
      res.status(422).json({ errors: err.errors });
    });
});

module.exports = router;
