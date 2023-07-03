const express = require("express");
require("dotenv").config();
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ Success: "true", authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: login a user using POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Try again with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      res.json({ Success: "true", authtoken });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3 : get logged in user using POST "/api/auth/getuser".
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // selects everything except the password.
    res.json({ Success: "true", user });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
