const { DataTypes } = require("sequelize");
const { sequelize } = require("../server");
const Apparel = require("./apparel");

const Closet = sequelize.define(
  "Closet",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isLiked: {
      type: DataTypes.BOOLEAN,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "Closet",
  }
);
Apparel.hasMany(Closet, {
  foreignKey: "apparel1",
});
Apparel.hasMany(Closet, {
  foreignKey: "apparel2",
});
module.exports = Closet;
