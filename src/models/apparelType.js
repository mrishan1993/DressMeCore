const { DataTypes } = require('sequelize');
const { sequelize } = require('../server');

const ApparelType = sequelize.define(
  'ApparelType',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    apparel_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    modelName: 'apparel_type'
  }
);

module.exports = ApparelType;
