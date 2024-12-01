/**
 * This is the main Express.js application file that sets up the server and routes.
 * It imports various route handlers and middleware, and configures the server to use them.
 * The server listens on the root path and responds with a message indicating that it is running.
 * It also handles 404 errors by sending a "404 Not Found" response.
 */
const express = require("express");
const app = express();
const cors = require("cors");
const categories = require("./routes/categories");
const products = require("./routes/products");
const brands = require("./routes/brands");
const options = require("./routes/options");
const checkout = require("./routes/checkout");

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/categories", categories);
app.use("/products", products);
app.use("/brands", brands);
app.use("/options", options);
app.use("/checkout", checkout);

app.get("/", (req, res) => {
  res.send("server is running 🚀");
});

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
