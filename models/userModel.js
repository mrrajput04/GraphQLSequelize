const Sequelize = require("sequelize");
const sequelize = require("../db");
const { Address } = require("./addressModel");

const tableName = 'Users';

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  address: [Address],
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  verified: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
},{ tableName });

module.exports = { User };
