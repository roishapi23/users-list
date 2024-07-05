require("dotenv").config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  // List of routes that do not require token verification
  const openRoutes = ['/registration'];

  // Check if the request path is in the openRoutes
  if (openRoutes.includes(req.path)) {
    return next();
  }

  // extract token
  const token = req.headers['authorization'];


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // varify token
  jwt.verify(token, process.env.JWT_SECRET, (err, userinfo) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    console.log("userinfo",userinfo);
    next();
  });
}

module.exports = authMiddleware;