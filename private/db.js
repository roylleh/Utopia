const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@mysql.ctt1pmyv4tue.us-east-1.rds.amazonaws.com:3306/utopia', { operatorsAliases: false });

module.exports = { Sequelize, sequelize };