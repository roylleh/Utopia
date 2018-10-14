const { Sequelize, sequelize } = require('../db');

const Ticket = sequelize.define('ticket',
    {
        ticketId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        reservationId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        flightId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        seatId:
        {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ticket_num:
        {
            type: Sequelize.CHAR
        },
        passenger_name:
        {
            type: Sequelize.STRING
        },
        passenger_age:
        {
            type: Sequelize.TINYINT
        },
        price:
        {
            type: Sequelize.DECIMAL
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Ticket;