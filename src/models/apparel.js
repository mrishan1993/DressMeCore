const { DataTypes } = require("sequelize");
const { sequelize } = require("../server");
const ApparelType = require("./apparelType");

const Apparel = sequelize.define(
  "Apparel",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    apparel_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "Apparel",
  }
);
Apparel.belongsTo(ApparelType, {
  foreignKey: "apparel_type_id",
});
module.exports = Apparel;
