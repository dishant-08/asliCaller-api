"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Contacts", "spamReports", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    // Update the spam status based on the condition
    // await queryInterface.sequelize.query(`
    //   UPDATE "Contacts"
    //   SET "spam" = true
    //   WHERE "spamReports" > 10;
    // `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "spamReports");
  },
};
