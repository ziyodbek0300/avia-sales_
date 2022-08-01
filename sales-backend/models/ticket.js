'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    chartRegular: DataTypes.STRING,
    detail: DataTypes.STRING,
    bookingStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    price: DataTypes.STRING,
    passengers: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};