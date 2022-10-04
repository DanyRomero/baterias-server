const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require("axios");
const Client = require("../models/Client.model");
const Order = require("../models/Order.model");

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

const sendEmail = (template_id, template_params) => {
  const dataUser = {
    service_id: process.env.SERVICE_ID,
    template_id,
    user_id: process.env.PUBLIC_KEY,
    template_params,
    accessToken: process.env.PRIVATE_KEY,
  };
  const url = "https://api.emailjs.com/api/v1.0/email/send";
  axios({
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(dataUser),
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
    .then((order) => order.populate("battery"))
    .then((order) => {
      sendEmail(process.env.TEMPLATE_ID_COMPRA, {
        correoCliente: req.body.email,
        name: req.body.name,
        battery: order.battery.name,
        model: order.battery.model,
        price: order.battery.price,
        address: order.address.addressOne,
        address2: order.address.addressTwo,
        zipcode: order.address.zipCode,
        town: order.address.town,
        state: order.address.state,
      });
      sendEmail(process.env.TEMPLATE_ID_ADMIN, {
        client: req.body.name,
        lastName: req.body.lastName,
        clientEmail: req.body.email,
        phone: req.body.phone,
        battery: order.battery.name,
        model: order.battery.model,
        price: order.battery.price,
        address: order.address.addressOne,
        address2: order.address.addressTwo,
        zipcode: order.address.zipCode,
        town: order.address.town,
        state: order.address.state,
      });
      return order
    })
    .then((order) => res.json(order))
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
      console.error(err);
      res.status(422).json({ errors: err.errors });
    });
});

module.exports = router;
