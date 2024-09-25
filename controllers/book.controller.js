const Book = require("../models/Book.js");
const { CreateError } = require("../utils/error.js");
const { CreateSuccess } = require("../utils/success.js");

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return next(CreateSuccess(200, "All Books Fetched", books));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};
