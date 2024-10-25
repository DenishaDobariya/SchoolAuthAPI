const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }

      const token = authHeader.split(' ')[1];
      console.log("token>>> ", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded>>> ", decoded);

      if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
      }

      req.user = decoded;

      next();  

    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = protect;
