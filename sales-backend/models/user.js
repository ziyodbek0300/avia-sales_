'use strict';
const {
  Model
} = require('sequelize');
const userRole = require("../constants/userRole");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
        type:DataTypes.STRING,
        unique:true,
      allowNull: false,
    },
    fullName:DataTypes.STRING,
    city:DataTypes.STRING,
    password:DataTypes.STRING,
    phone:DataTypes.STRING,
    nameCompany:DataTypes.STRING,
    doc:{
      type:DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    isChecked:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    role:{
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue:userRole.agent
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};