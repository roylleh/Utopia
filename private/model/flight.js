const { Sequelize, sequelize } = require('../db');

const Flight = sequelize.define('flight',
    {
        flightId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        flight_num:
        {
            type: Sequelize.CHAR
        },
        from_airport:
        {
            type: Sequelize.STRING
        },
        to_airport:
        {
            type: Sequelize.STRING
        },
        departure_date:
        {
            type: Sequelize.STRING
        },
        arrival_date:
        {
            type: Sequelize.STRING
        },
        economy_price:
        {
            type: Sequelize.DECIMAL
        },
        business_price:
        {
            type: Sequelize.DECIMAL
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Flight;