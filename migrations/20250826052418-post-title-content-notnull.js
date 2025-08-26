"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("posts", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("posts", "content", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("posts", "title", {
      type: Sequelize.STRING,
      allowNull: true, // rollback to nullable
    });

    await queryInterface.changeColumn("posts", "content", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
