"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PurchaseLists", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      FilmId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Films",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      accountNumber: {
        type: Sequelize.INTEGER,
      },
      transferProof: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PurchaseLists")
  },
}
