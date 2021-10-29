const { Model, DataTypes } = require("sequelize");

class Related extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        gender: DataTypes.TEXT,
        civil_status: DataTypes.TEXT,
        identification: DataTypes.STRING,
        relationship: DataTypes.TEXT,
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
        naturalness: DataTypes.STRING,
        nationality: DataTypes.STRING,
        scholarity: DataTypes.BLOB,
        revenue: DataTypes.FLOAT,
        professional_situation: DataTypes.STRING,
        occupation: DataTypes.STRING,
        national_identify: DataTypes.STRING,
        responsible: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Assisted, { foreignKey: "assisted_id", as: "assisteds"});
  }
}

module.exports = Related;
