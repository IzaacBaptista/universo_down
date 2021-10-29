const { Model, DataTypes } = require('sequelize');

class Organization extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      domain: DataTypes.STRING

    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.User, {foreignKey: 'organization_id', as: 'user' });
  }
}

module.exports = Organization;