"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Renames the 'Profiles' table to 'user_profiles'
    await queryInterface.renameTable("Profiles", "user_profiles");
  },

  async down(queryInterface, Sequelize) {
    // Reverts the name from 'user_profiles' back to 'Profiles'
    await queryInterface.renameTable("user_profiles", "Profiles");
  },
};
