"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add userId to BlogPost table
    await queryInterface.addColumn("posts", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "SET NULL",
    });

    // Add userId to Comments table
    await queryInterface.addColumn("comments", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "SET NULL",
    });

    // Add blogPostId to Comments table
    await queryInterface.addColumn("comments", "postId", {
      type: Sequelize.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "userId");
    await queryInterface.removeColumn("comments", "userId");
    await queryInterface.removeColumn("comments", "postId");
  },
};
