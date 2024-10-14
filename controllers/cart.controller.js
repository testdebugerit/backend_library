const User = require("../models/User");
const { CreateError } = require("../utils/error");
const { CreateSuccess } = require("../utils/success");

// Get Cart Items for the Logged-in User
exports.getCartItems = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.bookId"); // Populate cart items with book details
    if (!user) {
      return next(CreateError(404, "User not found"));
    }
    return next(CreateSuccess(200, "Cart items fetched", user.cart));
  } catch (err) {
    return next(CreateError(500, "Error fetching cart items"));
  }
};

// Add Book to Cart
exports.addToCart = async (req, res, next) => {
  const { bookId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(CreateError(404, "User not found"));
      //return res.status(404).json(CreateError(404, "user not found!"));
    }

    // Check if book already exists in the cart
    const existingItem = user.cart.find(
      (item) => item.bookId.toString() === bookId
    );
    if (existingItem) {
      // If the book is already in the cart, increase the quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add the new book to the cart
      user.cart.push({ bookId, quantity: 1 });
    }

    await user.save();
    return next(CreateSuccess(200, "Book added to cart", user.cart));
  } catch (err) {
    return next(CreateError(500, "Error adding book to cart"));
  }
};

// Remove Book from Cart
exports.removeFromCart = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(CreateError(404, "User not found"));
    }

    // Filter out the book to remove it from the cart
    user.cart = user.cart.filter((item) => item.bookId.toString() !== bookId);

    await user.save();
    return next(CreateSuccess(200, "Book removed from cart", user.cart));
  } catch (err) {
    return next(CreateError(500, "Error removing book from cart"));
  }
};
