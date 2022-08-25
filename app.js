"use strict";

/** Express app for Showdown. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const schoolsRoutes = require("./routes/schools");
const usersRoutes = require("./routes/users");

const morgan = require("morgan");

const stripe = require("./stripeApi");
const app = express();

// const stripe = require('stripe')('sk_test_51LafUjBMGCeUikoeiu3ejcQU1v3adPBMehfVC9Z6jquU6U4Hxowzkykkw8spn72R9rlriRrrzrXZxegRWKJg5COG003uQZc4cJ');

// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));

stripe.createCustomer("example@customer.com");
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

app.use("/auth", authRoutes);
app.use("/schools", schoolsRoutes);
app.use("/users", usersRoutes);
app.use("/", usersRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
