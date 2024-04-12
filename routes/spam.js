const express = require("express");
const router = express.Router();
const { Contacts } = require("../models");

// Set spam status for a given phone number
router.post("/markSpam", async (req, res) => {
  try {
    const { phonenumber } = req.body;

    // Find the contact by phone number
    const contact = await Contacts.findOne({
      where: { phonenumber: phonenumber },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Increase spam reports count
    const updatedSpamReports = contact.spamReports + 1;

    // Update spam reports count
    await contact.update({ spamReports: updatedSpamReports });

    // If spam reports exceed 2, set spam status to true
    if (updatedSpamReports > 2) {
      await contact.update({ spam: true });
    }

    res.status(200).json({ message: "Spam status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
