const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../models/userSchema");

// Register User
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Plz provide details" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      await user.save();
      res.status(201).json({ message: "user registereed succesfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// User Sign-In
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Pls fill data" });
    }
    const userSignIn = await User.findOne({ email: email });
    if (userSignIn) {
      const match = await bcryptjs.compare(password, userSignIn.password);
      token = await userSignIn.generateAuthToken();
      res.cookie("jwtoken", token);
      if (!match) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Signin Sucessfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  res.send("D");
});
// Doctor Search Page
router.get("/doctor", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// LogOut Page
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged Out");
});
module.exports = router;
