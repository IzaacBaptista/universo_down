"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("school_requests", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      assisted_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "assisteds", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      response_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("school_requests");
  },
};
