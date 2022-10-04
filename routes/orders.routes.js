const router = require("express").Router();
const mongoose = require("mongoose");

const Client = require("../models/Client.model");
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
    .populate(["brand", "battery"])
    .then((order) => res.json(order))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Order.findByIdAndUpdate(id, req.body, { new: true })
    .then((order) => res.json(order))
    .catch((err) => {
      res.status(422).json({ errors: err.errors });
    });
});

router.post("/:id/cliente", (req, res) => {
  const { id } = req.params;
  Client.create(req.body)
    .then((newClient) => {
      const now = new Date();
      return Order.findByIdAndUpdate(
        id,
        { client: newClient, completedAt: now },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log(err);
      res.status(422).json({ errors: err.errors });
    });
});

router.get("/", (req, res) => {
  Order.find({ completedAt: { $ne: null } })
    .sort("completedAt")
    .populate(["brand", "battery", "client", "model", "year"])
    .then((orders) => res.json(orders))
    .catch((err) => {
      res.status(422).json({ errors: err.errors });
    });
});

router.post("/:orderId/direccion", (req, res) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      order.address = req.body;
      return order.save();
    })
    .then((newOrder) => {
      res.json(newOrder);
    })
    .catch((err) => {
      console.error(err)
      res.status(422).json({ errors: err.errors });
    });
});

module.exports = router;
