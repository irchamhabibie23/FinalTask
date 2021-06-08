"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Films", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.UUID,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      filmUrl: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      backdrop: {
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
    await queryInterface.dropTable("Films")
  },
}
