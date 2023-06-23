const express = require("express");
const router = express.Router();
const seatController = require("../Controller/seats");

router.get("/", seatController.getallSeats);
router.get("/:id", seatController.getseatById);

module.exports = router;
