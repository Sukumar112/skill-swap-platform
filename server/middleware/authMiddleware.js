const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the 'x-auth-token' header
  const token = req.header('x-auth-token');

  // If no token is found, return a 401 error
  if (!token) {
    console.log("No token provided.");
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging (remove in production)
    console.log("Token decoded:", decoded);

    // Attach the decoded user to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Handle different error types
    if (err.name === 'TokenExpiredError') {
      console.error("JWT expired:", err.message);
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Handle other JWT verification errors
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
