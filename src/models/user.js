const { DataTypes } = require('sequelize');
const { sequelize } = require('../server');
const Apparel = require('./apparel');
const Closet = require('./closet');
const Provider = require('./provider');
const Session = require('./session');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN
    },
    role: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'User'
  }
);

User.belongsTo(Provider, {
  foreignKey: 'provider_id'
});
User.hasMany(Apparel, {
  foreignKey: 'user_id'
});
User.hasMany(Closet, {
  foreignKey: 'user_id'
});
User.hasOne(Session, {
  foreignKey: 'user_id'
});
module.exports = User;
