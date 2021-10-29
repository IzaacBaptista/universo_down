'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('calendars', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      day_of_week: { 
        type: Sequelize.TEXT,
        allowNull: false,
    },
      start_hour: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
      end_hour: { 
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('calendars');
  }
};
