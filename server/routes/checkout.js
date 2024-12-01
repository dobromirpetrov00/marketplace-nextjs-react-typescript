/**
 * Handles the checkout process.
 *
 * This route simulates a checkout process by waiting for 2 seconds and then
 * randomly returning a "success" or "checkout failed" response with a 400 status
 * code.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
const router = require("express").Router();

router.post("/", (req, res) => {
  setTimeout(() => {
    const random = Math.random();
    if (random < 0.2) return res.send("checkout failed").status(400);
    return res.send("success");
  }, 2000);
});

module.exports = router;
