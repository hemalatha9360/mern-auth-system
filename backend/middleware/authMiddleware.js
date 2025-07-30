const jsonwebtoken = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the get token
    req.user = decoded; //if it valid token set into req.user
    console.log(decoded);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}
module.exports = authMiddleware;
