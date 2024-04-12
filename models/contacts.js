"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init(
    {
      display_name: DataTypes.STRING,
      phonenumber: DataTypes.BIGINT,
      email: DataTypes.STRING,
      spam: DataTypes.BOOLEAN,
      spamReports: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Contacts",
    }
  );
  return Contacts;
};
