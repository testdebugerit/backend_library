const BookJson = require("./Bookstore.books.json");
const Book = require("./models/Book.js");

const seedBooksData = async () => {
  try {
    // connection to the database
    // query
    await Book.deleteMany({});
    await Book.insertMany(BookJson);
    console.log("Data seeded successfully");

    // disconnect
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { seedBooksData };
