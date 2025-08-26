"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Sequelize is Awesome",
          content: "This is a post about how great Sequelize is.",
          userId: 38,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Getting Started with React.js",
          content: "A beginner guide to React.js development.",
          userId: 39,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
