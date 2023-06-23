const express = require("express");
const Booking = require("../models/booking");
const Seats = require("../models/seats");
const seatprice = require("../seatPrice");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
// const transport = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         process.env.api_key,
//     },
//   })
// );
exports.getBooking = (req, res, next) => {
  const email = req.query.userIdentifier;
  Booking.findOne({ email: email })
    .then((seats) => {
      res.status(200).json({ seats: seats });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.doBooking = (req, res, next) => {
  const Id = req.body.seat_identifier;
  let priceof;
  Seats.findOne({ seat_identifier: Id })
    .then((seat) => {
      console.log("here 2");
      if (!seat.is_booked) {
        console.log("here 1");
        priceof = seatprice(seat);
        console.log("This is price", priceof);
        const booking = new Booking({
          seat_id: seat,
          name: req.body.name,
          email: req.body.email,
        });
        booking
          .save()
          .then((obj) => {
            console.log("here");
            Seats.updateOne({ seat_identifier: Id }, { is_booked: true })
              .then(() => {
                console.log("This is price1");
                console.log(priceof);
                res.status(200).json({ booking_Id: obj._id, price: priceof });
                // return transport.sendMail({
                //   to: "Flurn@flurn.com",
                //   from: "haritiwari442@gmail.com",
                //   subject: "SignUp!",
                //   html: "<h1>You successfully Signed Up!",
                // });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(200).json({ message: "ticket is already booked" });
      }
    })
    .catch((err) => console.log(err));
};
