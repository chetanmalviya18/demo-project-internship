"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Rename 'profiles' table to 'user_profiles'
    await queryInterface.renameTable("user_profiles", "user_profiles");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Revert table name back to 'profiles'
    await queryInterface.renameTable("user_profiles", "profiles");
  },
};
