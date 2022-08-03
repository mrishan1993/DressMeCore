const { DataTypes } = require("sequelize");
const { sequelize } = require("../server");

const Provider = sequelize.define(
  "Provider",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    provider_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    modelName: "Provider",
  }
);

module.exports = Provider;
