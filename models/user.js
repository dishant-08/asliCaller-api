"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      phonenumber: DataTypes.BIGINT,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      display_name: DataTypes.STRING, // Add the new column
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
