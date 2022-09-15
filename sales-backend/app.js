const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ticket = require("./routes/ticket");
const region = require("./routes/region");
const flight = require("./routes/flight");
const order = require("./routes/order");
const hotel = require("./routes/hotel");
const transfer = require("./routes/transfer");
const registration = require("./routes/registration");
const visa = require("./routes/visa");
const tour = require("./routes/tour");
const hotelOrder = require("./routes/hotelOrder");
const tourPack = require("./routes/tourPack");
const auth = require("./service/auth");
const app = express();

app.set("view engine", "html");
app.use(logger("dev"));
app.use(cors());
app.use(auth);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: false,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/register", registration);
app.use("/ticket", ticket);
app.use("/region", region);
app.use("/flight", flight);
app.use("/order", order);
app.use("/transfer", transfer);
app.use("/visa", visa);
app.use("/hotel", hotel);
app.use("/tour", tour);
app.use("/hotel-order", hotelOrder);
app.use("/tour-packet-order", tourPack);

module.exports = app;
