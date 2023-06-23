const Seat = require("./models/seats");

module.exports = seatPrice = (seat) => {
  const total = Seat.find({ seat_class: seat.seat_class }).count();
  const booked = Seat.find({
    seat_class: seat.seat_class,
    is_booked: true,
  }).count();
  const percentage = (booked * 100) / total;
  let price = 0;
  if (percentage < 40) {
    if (seat.min_price != "NaN") {
      price = seat.min_price;
    } else {
      price = seat.normal_price;
    }
  } else if (percentage > 40 && percentage < 60) {
    if (seat.normal_price != "NaN") {
      price = seat.normal_price;
    } else {
      price = seat.max_price;
    }
  } else {
    if (seat.max_price != "NaN") {
      price = seat.max_price;
    } else {
      price = seat.normal_price;
    }
  }
  return price;
};
