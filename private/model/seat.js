const { Sequelize, sequelize } = require('../db');

const Seat = sequelize.define('seat',
    {
        seatId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        flightId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        seat_num:
        {
            type: Sequelize.TINYINT
        },
        priceClass:
        {
            type: Sequelize.CHAR
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Seat;