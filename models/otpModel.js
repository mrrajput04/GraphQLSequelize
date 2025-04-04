const Sequelize = require("sequelize");
const sequelize = require("../db");


const tableName = 'Otp';

const Otp = sequelize.define("Otp", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

},{timestamps:true},{ tableName });

module.exports = { Otp };
