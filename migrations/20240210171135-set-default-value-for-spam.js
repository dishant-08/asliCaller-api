"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Contacts", "spam", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Contacts", "spam", {
      type: Sequelize.BOOLEAN,
    });
  },
};
