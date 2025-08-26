"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Chetan",
          lastName: "Malviya",
          email: "chetan@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sidharth",
          lastName: "Deora",
          email: "sidharth@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
