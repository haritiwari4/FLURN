const express = require("express");
const Seats = require("../models/seats");
const seatprice = require("../seatPrice");

exports.getallSeats = (req, res, next) => {
  Seats.find()
    .sort({ seat_class: +1 })
    .then((seats) => {
      res.status(200).json({ seats: seats });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getseatById = (req, res, next) => {
  const Id = req.params["id"];
  Seats.findOne({ seat_identifier: Id })
    .then((seat) => {
      const price = seatprice(seat);
      const is_booked = seat.is_booked;
      res
        .status(200)
        .json({ seat_identidier: Id, price: price, is_booked: is_booked });
    })
    .catch((err) => {
      console.log(err);
    });
};
