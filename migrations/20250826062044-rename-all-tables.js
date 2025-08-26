"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("users", "users");
    await queryInterface.renameTable("posts", "posts");
    await queryInterface.renameTable("comments", "comments");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("users", "users");
    await queryInterface.renameTable("posts", "posts");
    await queryInterface.renameTable("comments", "comments");
  },
};
