"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Film.belongsTo(models.User, {})
      Film.belongsTo(models.Category, {})
      Film.hasMany(models.PurchaseList, {
        as: "purchasedFilms",
      })
    }
  }
  Film.init(
    {
      UserId: DataTypes.UUID,
      CategoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      filmUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      backdrop: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Film",
    }
  )
  return Film
}
