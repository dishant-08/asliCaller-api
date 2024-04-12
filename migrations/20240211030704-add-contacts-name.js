"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Contacts", "display_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Update the spam status based on the condition
    // await queryInterface.sequelize.query(`
    //   UPDATE "Contacts"
    //   SET "spam" = true
    //   WHERE "spamReports" > 10;
    // `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "display_name");
  },
};
