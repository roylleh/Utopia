const { Sequelize, sequelize } = require('../db');

const Reservation = sequelize.define('reservation',
    {
        reservationId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        reservation_num:
        {
            type: Sequelize.CHAR
        },
        book_date:
        {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Reservation;