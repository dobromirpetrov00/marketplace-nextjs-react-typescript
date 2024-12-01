/**
 * Provides an API endpoint to retrieve a list of categories.
 *
 * @route GET /categories
 * @returns {Object[]} An array of category objects
 */
const router = require("express").Router();
const data = require("../data/categories.json");
router.get("/", (req, res) => {
  res.send(data);
});

module.exports = router;
