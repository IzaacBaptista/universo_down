const { Model, DataTypes } = require("sequelize");

class Assisted extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
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
        has_benefits: DataTypes.BOOLEAN,
        scholarity: DataTypes.BLOB,
        naturalness: DataTypes.STRING,
        nationality: DataTypes.STRING,
        occupation: DataTypes.STRING,
        national_identify: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        additional_information: DataTypes.STRING,
        photo: DataTypes.BLOB,
        benefits: DataTypes.BLOB,
        social_identification_number: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Related, { foreignKey: "assisted_id", as: "relateds" });
    this.hasMany(models.SchoolRequest, { foreignKey: "assisted_id", as: "school_requests" });
    this.hasMany(models.TransportRequest, { foreignKey: "assisted_id", as: "transpor_requests" });

    this.hasMany(models.EvolutionRecord, { as: 'evolution_records', foreignKey: 'assisted_id'});
  }
}

module.exports = Assisted;
