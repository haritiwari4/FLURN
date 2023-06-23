const express = require("express");
const app = express();
const mongoose = require("mongoose");
const seats = require("./router/seats");
const booking = require("./router/booking");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use("/seats", seats);
app.use("/booking", booking);
mongoose
  .connect(
    "mongodb+srv://haritiwari442:cVy46VtGieeCFEXd@cluster0.wbgnnv6.mongodb.net/flurn"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server up and running on port 8080");
    });
  })
  .catch((err) => console.log(err));
