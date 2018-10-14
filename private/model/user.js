const { Sequelize, sequelize } = require('../db');

const User = sequelize.define('user',
    {
        userId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email:
        {
            type: Sequelize.STRING
        },
        password:
        {
            type: Sequelize.STRING
        },
        name:
        {
            type: Sequelize.STRING
        },
        role:
        {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = User;