const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (id, username) => {
  const accessToken = jwt.sign({ id: id, username: username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Unauthorized access");
  }
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send("Invalid token");
    }
    req.id = decoded.id;
    req.username = decoded.username;
    next();
  });
};

module.exports = { generateAccessToken, verifyAccessToken };
