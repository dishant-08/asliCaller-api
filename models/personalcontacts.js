'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalContacts.init({
    display_name: DataTypes.STRING,
    phonenumber: DataTypes.BIGINT,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PersonalContacts',
  });
  return PersonalContacts;
};