const jwt = require("jsonwebtoken");
const { CreateError } = require("./error");

// Verify if the token is present in the Authorization header and valid
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header contains the Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //return next(CreateError(401, "You are not authenticated!"));
          return res.status(403).json(CreateError(403, "No token found"));

  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];
 console.log("verifyToken.js verifyToken() token: ",  token);
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
     // return next(CreateError(403, "Token is not valid!"));
             return res.status(403).json(CreateError(403, "You are not authenticated!"));
 }
    req.user = user; // Set the user in request object
    next(); // Proceed to the next middleware
  });
};

// Verify user access
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // Check if the user is accessing their own data or if they are an admin
    if (!req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json(CreateError(403, "You are not authorized!"));
    }
  });
};

// Verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Check if the user has admin privileges
    if (req.user.isAdmin) {
      next();
    } else {
      //return next(CreateError(403, "You are not authorized!"));
            return res.status(403).json(CreateError(403, "You are not authorized!"));

    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };

// const jwt = require("jsonwebtoken");
// const { CreateError } = require("./error");

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(CreateError(401, "You are not authenticated!"));
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(CreateError(403, "Token is not Valid"));
//     } else {
//       req.user = user;
//     }
//     next();
//   });
// };

// const verifyUser = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(CreateError(403, "You are not authorized!"));
//     }
//   });
// };

// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(CreateError(403, "You are not authorized!"));
//     }
//   });
// };

// module.exports = { verifyToken, verifyUser, verifyAdmin };
