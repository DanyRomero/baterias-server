const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require("axios");
const Client = require("../models/Client.model");
const Order = require("../models/Order.model");

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

router.post("/", (req, res) => {
  Order.create(req.body)
    .then((order) => res.json(order))
    .catch((err) => {
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
    .populate(["brand", "battery", "client"])
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
  const { client, deliverBattery } = req.body;
  Client.create(client)
    .then((newClient) => {
      const now = new Date();
      return Order.findByIdAndUpdate(
        id,
        { client: newClient, deliverBattery, completedAt: now },
        { new: true }
      );
    })
    .then((order) => order.populate("battery"))
    .then((order) => {
      console.log({ client, order, req: req.body });
      mg.messages.create("mg.distelub.com", {
        from: "Distelub-Baterías <ventas@distelub.com>",
        bcc: "mcecilia@distelub.com",
        to: [client.email],
        subject: "Distelub- La orden de tu batería está en proceso",
        template: "order-confirmation",
        "h:X-Mailgun-Variables": JSON.stringify({
          client: client.name,
          lastName: client.lastName,
          clientEmail: client.email,
          phone: client.phone,
          model: order.battery.model,
          price: order.battery.price,
          address: order.address.addressOne,
          address2: order.address.addressTwo,
          zipcode: order.address.zipCode,
          town: order.address.town,
          state: order.address.state,
        }),
      });

      return order;
    })
    .then((order) => res.json(order))
    .catch((err) => {
      console.log(err);
      res.status(422).json({ errors: err.errors });
    });
});

router.get("/", (req, res) => {
  Order.find({ completedAt: { $ne: null } })
    .sort({ completedAt: -1 })
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
      order.address = req.body.address;
      order.deliveryType = req.body.deliveryType;

      return order.save();
    })
    .then((newOrder) => {
      res.json(newOrder);
    })
    .catch((err) => {
      console.error(err);
      res.status(422).json({ errors: err.errors });
    });
});

router.post("/:orderId/horario", (req, res) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      order.deliveryHour = req.body.deliveryHour;
      return order.save();
    })
    .then((newOrder) => {
      res.json(newOrder);
    })
    .catch((err) => {
      console.error(err);
      res.status(422).json({ errors: err.errors });
    });
});
module.exports = router;
