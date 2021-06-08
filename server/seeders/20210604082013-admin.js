"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        fullName: "Super Admin",
        email: "admin@admin.com",
        password:
          "$2b$10$vSMPdyOzBhLNzP25oGfcvO3heu0vSwzvT0EXNsISqwGPUAlznEwW2",
        avatar: "conten.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
