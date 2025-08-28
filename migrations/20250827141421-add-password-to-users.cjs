"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove or comment this out if the column already exists
    // await queryInterface.addColumn("users", "password", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    // You can keep this if you want to remove the column on rollback
    await queryInterface.removeColumn("users", "password");
  },
};
