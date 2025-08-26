"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          body: "Great post! Thanks for sharing.",
          userId: 39,
          postId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "Very informative. Looking forward to more posts.",
          userId: 38,
          postId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
