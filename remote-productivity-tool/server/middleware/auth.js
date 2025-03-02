const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user data to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, deny access
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;