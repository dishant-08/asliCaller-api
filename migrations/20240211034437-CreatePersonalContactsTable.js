// In the generated migration file (timestamp will be different)
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PersonalContacts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PersonalContacts");
  },
};
