"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_profiles",
      [
        {
          bio: "A backend developer from Rani, Rajasthan.",
          location: "Rani, Rajasthan",
          userId: 38,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bio: "A frontend developer from Sheoganj, Rajasthan.",
          location: "Sheoganj, Rajasthan",
          userId: 39,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_profiles", null, {});
  },
};
