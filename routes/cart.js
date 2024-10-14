const express = require("express");
const { verifyUser } = require("../utils/verifyToken");
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller");

const router = express.Router();

// Get cart items for the logged-in user
router.get("/", verifyUser, getCartItems);

// Add book to cart
router.post("/add", verifyUser, addToCart);

// Remove book from cart
router.delete("/remove/:bookId", verifyUser, removeFromCart);

module.exports = router;
