const { DataTypes } = require('sequelize');
const { sequelize } = require('../server');

const Session = sequelize.define(
  'Session',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    access_token: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'Session'
  }
);

module.exports = Session;
