// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User, Contacts } = require("../models");
const jwt = require("jsonwebtoken");

// const crypto = require("crypto");

// Generate a random secure key
// const secretKey = crypto.randomBytes(32).toString("hex");

router.post("/signup", async (req, res) => {
  try {
    const { phonenumber, email, password, display_name } = req.body;

    // Hash the password
    // const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      display_name,
      phonenumber,
      email,
      passwordHash,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phonenumber, password } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ where: { phonenumber } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create Cookie
    const token = user.phonenumber;

    // Set the token as a cookie in the response
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    // Return the token and user ID in the response body
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getDetails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve details for the person by ID
    const contactDetails = await Contacts.findByPk(id);

    if (!contactDetails) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Check if the phone number exists in the User table
    const userWithPhoneNumber = await User.findOne({
      where: { phonenumber: contactDetails.phonenumber },
    });

    // Prepare the response object
    const response = {
      name: contactDetails.name,
      phonenumber: contactDetails.phonenumber,
      spamLikelihood: contactDetails.spam,
    };

    // If the phone number exists in the User table, include the email in the response
    if (userWithPhoneNumber) {
      response.email = userWithPhoneNumber.email;
    }

    // Return details with spam likelihood and optionally email
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
