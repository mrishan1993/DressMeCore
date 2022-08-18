const { DataTypes } = require('sequelize');
const { sequelize } = require('../server');

const Question = sequelize.define(
  'Question',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    textEntry: {
      type: DataTypes.BOOLEAN
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    modelName: 'Question'
  }
);

module.exports = Question;
