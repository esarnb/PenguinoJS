const { BuildOptions, DataTypes, Model, Optional } = require("sequelize");
const sequelizeConnection = require("../config");

class Users extends Model {}

module.exports = Users.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: 'column'
  },
  snowflakes: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize: sequelizeConnection,
  timestamps: true, // localized createdAt, updatedAt props
  freezeTableName: true, // Model tableName will be the same as the model name
  paranoid: true
});