const { Model, DataTypes } = require('sequelize');

class ProfessionalAttendance extends Model {
  static init(sequelize) {
    super.init({
      date: DataTypes.DATE,
      result: DataTypes.TEXT,
      quantity: DataTypes.INTEGER

    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = ProfessionalAttendance;