const { BuildOptions, DataTypes, Model, Optional } = require("sequelize");
const sequelizeConnection = require("../config");

class Servers extends Model {}

module.exports = Servers.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: 'column'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: sequelizeConnection,
  timestamps: true, // localized createdAt, updatedAt props
  freezeTableName: true, // Model tableName will be the same as the model name
  paranoid: true
});