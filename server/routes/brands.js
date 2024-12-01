/**
 * Provides a route to retrieve a list of brands.
 *
 * @route GET /brands
 * @returns {Object[]} An array of brand objects
 */
const router = require("express").Router();
const data = require("../data/brands.json");
router.get("/", (req, res) => {
  res.send(data);
});

module.exports = router;
