const  { Dialect, Sequelize } = require("sequelize")

require("dotenv").config();
const { host, user, pass, dbname, dialect } = process.env;

const sequelizeConnection = new Sequelize(
  dbname, 
  user, 
  pass, 
  {
    host: host,
    dialect: dialect
  });

module.exports = sequelizeConnection