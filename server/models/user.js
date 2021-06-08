"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Film, {
        as: "myFilms",
      })
      User.hasMany(models.PurchaseList, {
        as: "purchasedFilms",
      })
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
