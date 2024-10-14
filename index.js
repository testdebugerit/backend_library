const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { seedBooksData } = require("./seed.js");

// Create an express app
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

// Load environment variables
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/library");
    await seedBooksData();
    console.log("db connected");
  } catch (error) {
    throw error;
  }
};

// Define your routes here
const roleRoute = require("./routes/role");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const cartRoute = require("./routes/cart");

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/cart", cartRoute);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
  });
});

// Response handler middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong";
  return res.status(statusCode).json({
    success: [200, 201, 204].includes(statusCode),
    status: statusCode,
    message: message,
    data: obj.data,
  });
});

// Start the server
app.listen(8000, () => {
  connectDB();
  console.log("Server running on port 8000");
});

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { seedBooksData } = require("./seed.js");

// // Create an express app
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:4200",
//     credentials: true,
//   })
// );

// // Load environment variables
// dotenv.config();

// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/library");
//     await seedBooksData();
//     console.log("db connected");
//   } catch (error) {
//     throw error;
//   }
// };

// // Define your routes here
// const roleRoute = require("./routes/role"); // Add your route files
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/user");
// const bookRoute = require("./routes/book");
// //const { seedBooksData } = require("./seed");
// const cartRoute = require("./routes/cart");

// app.use("/api/role", roleRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/book", bookRoute);
// app.use("/api/cart", cartRoute);

// // Error handler middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500;
//   const errorMessage = err.message || "Something went wrong";
//   return res.status(statusCode).json({
//     success: false,
//     status: statusCode,
//     message: errorMessage,
//   });
// });

// // Response handler middleware
// app.use((obj, req, res, next) => {
//   const statusCode = obj.status || 500;
//   const message = obj.message || "Something went wrong";
//   return res.status(statusCode).json({
//     success: [200, 201, 204].includes(statusCode),
//     status: statusCode,
//     message: message,
//     data: obj.data,
//   });
// });

// // Start the server
// app.listen(8000, () => {
//   connectDB();
//   console.log("Server running on port 8000");
// });
