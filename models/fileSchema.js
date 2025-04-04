const Sequelize = require("sequelize");
const sequelize = require("../db");

const tableName = 'Image';

const Image = sequelize.define("Image", {
filename: {
    type: Sequelize.String
  },
  mimetype: {
    type: Sequelize.String
  },
  path: {
    type: Sequelize.String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
},{ tableName })



module.exports = { Image };