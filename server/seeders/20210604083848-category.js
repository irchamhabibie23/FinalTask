"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      { name: "Family", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sci-Fi", createdAt: new Date(), updatedAt: new Date() },
      { name: "Horor", createdAt: new Date(), updatedAt: new Date() },
      { name: "Comedy", createdAt: new Date(), updatedAt: new Date() },
      { name: "Drama", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
