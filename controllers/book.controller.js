const Book = require("../models/Book.js");
const { CreateError } = require("../utils/error.js");

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "All Books Fetched",
      data: books,
    });
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};
