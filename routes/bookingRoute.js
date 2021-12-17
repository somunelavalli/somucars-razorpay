const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/bookcar", async (req, res) => {
  var razorpay = new Razorpay({
    key_id: "rzp_test_2lNx88Blumt0AQ",
    key_secret: "C04AFyyG9GTcT6bO6HWZ18mv",
  });
  var options = {
    amount: req.body.totalAmount * 100,
    currency: "INR",
    receipt: "sn_booking_001122",
  };
  console.log(options);
  razorpay.orders.create(options, (err, order) => {
    console.log(order);
    return res.send(order);
  });
  // try {

  //   req.body.transactionId = "Ordr_123";
  //   const newBooking = new Booking(req.body);
  //   await newBooking.save();
  //   const car = await Car.findOne({ _id: req.body.car });
  //   car.bookedTimeSlots.push(req.body.bookedTimeSlots);
  //   await car.save();
  //   res.send("Your Booking is Successful");
  // } catch (error) {
  //   return res.status(400).send(error);
  // }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
