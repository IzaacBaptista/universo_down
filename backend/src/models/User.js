const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin_role: DataTypes.TEXT,
      user_role: DataTypes.TEXT,
      birthday: DataTypes.DATE,
      gender: DataTypes.TEXT,
      identification: DataTypes.STRING,
      general_registration: DataTypes.STRING,
      isseu: DataTypes.DATE,
      issuer: DataTypes.STRING,
      zip_code: DataTypes.STRING,
      address: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      phone: DataTypes.STRING,
      national_identify: DataTypes.STRING

    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organizations' });
    this.belongsToMany(models.Calendar, { foreignKey: 'user_id', through: 'user_calendars', as: 'calendars' });
    this.hasMany(models.EvolutionRecord, { foreignKey: 'user_id', as: 'evolution_records' });
    this.hasMany(models.ProfessionalAttendance, { foreignKey: 'user_id', as: 'professional_attendances' });
    this.hasMany(models.Specialities, { foreignKey: 'user_id', as: 'specialities' });
  }
}

module.exports = User;