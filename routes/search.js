const express = require("express");
const router = express.Router();
const { Op, literal } = require("sequelize");
const { User, Contacts, PersonalContacts } = require("../models");

// Search for a person by name
router.get("/searchByName", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }

    // Search for contacts
    const results = await Contacts.findAll({
      attributes: {
        exclude: ["email"], // Exclude the email field from the response
      },
      where: {
        display_name: {
          [Op.or]: [
            { [Op.startsWith]: name }, // Names starting with the search query
            { [Op.substring]: name }, // Names containing but not starting with the search query
          ],
        },
      },
      order: [
        [
          literal(
            `CASE WHEN "display_name" ILIKE '${name}%' THEN 1 ELSE 2 END`
          ),
          "ASC",
        ],
        ["spam", "DESC"],
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/searchByPhoneNumber/:phonenumber", async (req, res) => {
  try {
    const { phonenumber } = req.params;

    // Check if there is a registered user with the given phone number
    const registeredUser = await User.findOne({
      where: { phonenumber: phonenumber },
    });

    if (registeredUser) {
      // If a registered user is found, return the user details
      return res.status(200).json({
        type: "user",
        user: {
          id: registeredUser.id,
          display_name: registeredUser.display_name,
          //   email: registeredUser.email,
          phonenumber: registeredUser.phonenumber,
          // Add other user details as needed
        },
      });
    }

    // If no registered user found, search for contacts with the given phone number
    const matchingContacts = await Contacts.findAll({
      attributes: {
        exclude: ["email"], // Exclude the email field from the response
      },

      where: { phonenumber: phonenumber },
    });

    // Return the matching contacts
    return res.status(200).json({
      type: "Global contacts",
      contacts: matchingContacts,
    });
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
    const PersonExistsInContacts = await PersonalContacts.findOne({
      where: { phonenumber: contactDetails.phonenumber },
    });

    // Prepare the response object
    const response = {
      display_name: contactDetails.display_name,
      phonenumber: contactDetails.phonenumber,
      spamLikelihood: contactDetails.spamReports,
      spam: contactDetails.spam,
    };

    // If the phone number exists in the User table, include the email in the response
    if (userWithPhoneNumber && PersonExistsInContacts) {
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
