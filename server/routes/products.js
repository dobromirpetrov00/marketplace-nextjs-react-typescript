const router = require("express").Router();

/**
 * Retrieves all products and returns them sorted by release date in descending order.
 *
 * @route GET /
 * @returns {Object[]} An array of product objects sorted by release date in descending order.
 */
const data = require("../data/products.json");
router.get("/", (req, res) => {
  const sortedData = data.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );
  res.send(sortedData);
});

/**
 * Retrieves a single product by its ID.
 *
 * @route GET /:id
 * @param {string} req.params.id - The ID of the product to retrieve.
 * @returns {Object} The product data, or a 404 Not Found response if the product is not found.
 */
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  const productData = data.find((product) => product.id === productId);

  if (productData) return res.send(productData);

  return res.send("404 Not Found").status(404);
});

module.exports = router;
