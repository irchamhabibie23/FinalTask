"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PurchaseList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseList.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      })
      PurchaseList.belongsTo(models.Film, {
        foreignKey: { allowNull: false },
      })
    }
  }
  PurchaseList.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      UserId: DataTypes.UUID,
      FilmId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      accountNumber: DataTypes.INTEGER,
      transferProof: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PurchaseList",
    }
  )
  return PurchaseList
}
