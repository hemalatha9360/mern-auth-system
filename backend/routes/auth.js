const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("../model/Register");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await Register.findOne({ email });
    if (existingEmail) return res.status(500).json("Email already Exist");

    const hashedpassword = await bcryptjs.hash(password, 8);

    const newUser = new Register({ name, email, password: hashedpassword });
    await newUser.save();
    res.status(201).json("Registered Saved Successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Register.findOne({ email });
    if (!existingUser)
      return res.status(500).json({ message: "Invalid Email" });

    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) return res.status(201).json("Invalid Password");

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/userprofile", authMiddleware, async (req, res) => {
  try {
    const user = await Register.findById(req.user.id).select("-password");
    if (!user) return res.status(500).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
