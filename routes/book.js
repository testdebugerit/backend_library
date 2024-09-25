const express = require("express");
const { getBooks } = require("../controllers/book.controller.js");

const router = express.Router();

router.get("/", getBooks);

module.exports = router;
