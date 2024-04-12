"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "display_name", {
      type: Sequelize.STRING,
      allowNull: false, // Set to true or false based on your requirements
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "display_name");
  },
};
