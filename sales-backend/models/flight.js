'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    fromId: DataTypes.NUMBER,
    toId: DataTypes.NUMBER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    duration: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
