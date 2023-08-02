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
        sent:[],
        recieve:[],
        friends: [],
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
    const user = await User.findById(userId).select("-password -friends -sent -recieve"); // selects everything except the password.
    res.json({ Success: "true", user });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Route 4 : sent friend request to a user using POST "/api/auth/sendReq".
router.put("/sendReq", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    let userEmail= req.body.email;
    const sendingUser = await User.findById(userId).select("email name sent"); // selects name and email.
    let sending={email:sendingUser.email,name:sendingUser.name};
    if(sending.email===userEmail){
      return res.status(400).json({ error: "Enter valid email" });
    }
    const sendingToUser = await User.findOne({email:userEmail}).select("name"); // selects name and email.
    if(!sendingToUser){
      return res.status(400).json({ error: "User does not exist" });
    }
    let sendingTo={email:userEmail,name:sendingToUser.name};

    const found = sendingUser.sent.some(el => el.email === userEmail)
    if(found){
      return res.status(400).json({ error: "Already sent" });
    }
        
    const user = await User.findByIdAndUpdate(userId,
      { $push: { sent : sendingTo } },
      { new:true } ); 
    const user2 = await User.findOneAndUpdate({email: userEmail},
      { $push: { recieve : sending } },
      { new:true } ); 
      let Sent= user.sent;
    res.json({ Success: "true", Sent });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5 : delete friend request to a user using POST "/api/auth/delReq".
router.put("/delReq", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    let userEmail= req.body.email;
    const recievingUser = await User.findById(userId).select("email"); // selects name and email.
        
    const user = await User.findByIdAndUpdate(userId,
      { $pull: { recieve : {email: userEmail} } },
      { new:true } ); 
    const user2 = await User.findOneAndUpdate({email: userEmail},
      { $pull: { sent : {email: recievingUser.email} } },
      { new:true } ); 
      let Rec=user.recieve;
    res.json({ Success: "true", Rec });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route 6 : Show all sent friend request to a user using POST "/api/auth/showSentReq".
router.get("/showSentReq", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const recievingUser = await User.findById(userId).select("sent"); // selects name and email.
    let user= recievingUser.sent
    res.json({ Success: "true", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route 7 : Show all recieved friend request to a user using POST "/api/auth/showRecReq".
router.get("/showRecReq", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const recievingUser = await User.findById(userId).select("recieve"); // selects name and email.
    let user= recievingUser.recieve
    res.json({ Success: "true", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route 8 : Accept friend request to a user using POST "/api/auth/accReq".
router.put("/accReq", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    let userEmail= req.body.email;
    let userName= req.body.name;
    const recievingUser = await User.findById(userId).select("email name sent"); // selects name and email.
    
    let sendingTo={email:userEmail,name:userName};
    const found = recievingUser.sent.some(el => el.email === userEmail)
    if(!found){
      return res.status(400).json({ error: "Request not found" });
    }
    const user = await User.findByIdAndUpdate(userId,
      { $pull: { recieve : {email: userEmail} } ,$push: { friends : sendingTo }},
      { new:true } ); 
    const user2 = await User.findOneAndUpdate({email: userEmail},
      { $pull: { sent : {email: recievingUser.email} } ,$push: { friends : {email: recievingUser.email,name: recievingUser.name}}},
      { new:true } ); 

      let Fri=user.friends;
    res.json({ Success: "true", Fri });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route 9 : Show all friends to a user using POST "/api/auth/showFriends".
router.get("/showFriends", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const recievingUser = await User.findById(userId).select("friends"); // selects name and email.
    let user= recievingUser.friends
    res.json({ Success: "true", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
