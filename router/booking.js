const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking");
router.get("/", bookingController.getBooking);
router.post("/", bookingController.doBooking);

module.exports = router;
