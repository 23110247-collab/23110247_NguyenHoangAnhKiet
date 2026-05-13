"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "auth_provider", {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: "local",
    });
    await queryInterface.addColumn("users", "auth_provider_id", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "auth_provider");
    await queryInterface.removeColumn("users", "auth_provider_id");
  },
};
