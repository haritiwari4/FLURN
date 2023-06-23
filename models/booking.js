const mongoose = require("mongoose");

const booking = new mongoose.Schema({
  seat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seats",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("booking", booking);
