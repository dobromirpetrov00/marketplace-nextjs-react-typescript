/**
 * Provides an API endpoint to retrieve option data from a JSON file.
 *
 * @route GET /options
 * @returns {Object[]} An array of option data objects
 */
const router = require("express").Router();
const data = require("../data/options.json");
router.get("/", (req, res) => {
  res.send(data);
});

module.exports = router;
