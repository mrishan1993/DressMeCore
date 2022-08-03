const { DataTypes } = require("sequelize");
const { sequelize } = require("../server");
const Option = require("./option");
const User = require("./User");
const Question = require("./Question");

const Answer = sequelize.define(
  "Answer",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "Answer",
  }
);
Answer.belongsTo(Option, {
  foreignKey: "option_id",
  allowNull: false,
});
// Answer.belongsTo(Option, {
//   foreignKey: "option_id",
//   allowNull: false,
// });
Answer.belongsTo(Question, {
  foreignKey: "question_id",
});
Answer.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = Answer;
