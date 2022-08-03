const { DataTypes } = require("sequelize");
const { sequelize } = require("../server");
const Question = require("./question");

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "Option",
  }
);

Option.belongsTo(Question, {
  foreignKey: "question_id",
});
Question.hasMany(Option, {
  foreignKey: "question_id",
});
module.exports = Option;
