const { Model, DataTypes } = require("sequelize");

class TransportRequest extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
        response_date: DataTypes.DATE,
        status: DataTypes.TEXT
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

module.exports = TransportRequest;
