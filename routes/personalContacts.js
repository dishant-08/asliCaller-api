// personalContacts.js
const express = require("express");
const router = express.Router();
const { PersonalContacts, Contacts } = require("../models");

// Save a new personal contact
router.post("/save", async (req, res) => {
  try {
    const { display_name, phonenumber, email } = req.body;

    // Check if the contact already exists
    const existingContact = await PersonalContacts.findOne({
      where: { phonenumber },
    });

    if (existingContact) {
      return res
        .status(400)
        .json({ error: "Contact with the same phone number already exists" });
    }

    // Create a new personal contact
    const newContact = await PersonalContacts.create({
      display_name,
      phonenumber,
      email,
    });

    await Contacts.create({
      display_name,
      phonenumber,
      email,
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
