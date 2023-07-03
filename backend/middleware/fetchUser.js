const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function fetchUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = await jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
