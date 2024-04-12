// routes/contacts.js
const express = require("express");
const router = express.Router();
const { Contacts } = require("../models");
const Chance = require("chance");

const chance = new Chance();

// Get all contacts
router.get("/getAll", async (req, res) => {
  try {
    // Generate 10 fake contacts
    const fakeContacts = Array.from({ length: 10 }, (_, index) => ({
      display_name: chance.name(),
      phonenumber: Math.floor(1000000000 + Math.random() * 9000000000),
      email: chance.email(),
    }));

    // Insert fake contacts into the database
    await Contacts.bulkCreate(fakeContacts);

    const contacts = await Contacts.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
