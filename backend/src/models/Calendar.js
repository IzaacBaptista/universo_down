const { Model, DataTypes } = require('sequelize');

class Calendar extends Model {
  static init(sequelize) {
    super.init({
      day_of_week: DataTypes.TEXT,
      start_hour: DataTypes.STRING,
      end_hour: DataTypes.STRING

    }, {
      sequelize,
      tableName: 'calendars',
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'calendar_id', through: 'user_calendars', as: 'users' });
  }
}

module.exports = Calendar;