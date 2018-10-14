const routes = require('express').Router();
const ticket = require('../model/ticket');

routes.get('/traveler/tickets', (req, res) =>
{
    ticket.findAll().then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.get('/traveler/tickets/:ticketId', (req, res) =>
{
    ticket.findById(req.params.ticketId).then(found =>
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            res.setHeader('Content-Type', 'application/json');
            res.send(found);
        }
    });
});

routes.get('/traveler/tickets/reservations/:reservationId', (req, res) =>
{
    ticket.findAll({ where: { reservationId: req.params.reservationId } }).then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.post('/traveler/tickets', (req, res) =>
{
    ticket.create({
        reservationId: req.body.reservationId,
        flightId: req.body.flightId,
        seatId: req.body.seatId,
        ticket_num: req.body.ticket_num,
        passenger_name: req.body.passenger_name,
        passenger_age: req.body.passenger_age,
        price: req.body.price
    }).then(result =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(result);
    });
});

routes.put('/traveler/tickets/:ticketId', (req, res) =>
{
    ticket.findById(req.params.ticketId).then(found =>
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.reservationId = req.body.reservationId;
            found.flightId = req.body.flightId;
            found.seatId = req.body.seatId;
            found.ticket_num = req.body.ticket_num;
            found.passenger_name = req.body.passenger_name;
            found.passenger_age = req.body.passenger_age;
            found.price = req.body.price;

            found.save().then(found =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(found);
            });
        }
    });
});

routes.delete('/traveler/tickets/:ticketId', (req, res) =>
{
    ticket.findById(req.params.ticketId).then(found =>
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.destroy().then(() =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.status(204);
                res.send({ Result: 'Content destroyed.' });
            });
        }
    });
});

module.exports = routes;