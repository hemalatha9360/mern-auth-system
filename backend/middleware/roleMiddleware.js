const jsonwebtoken = require("jsonwebtoken");
function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      res.status(500).json({ message: "access denied unauthorized role" });
    }
    next();
  };
}
module.exports = roleMiddleware;
