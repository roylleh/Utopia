const routes = require('express').Router();
const seat = require('../model/seat');

routes.get('/traveler/seats', (req, res) =>
{
    seat.findAll().then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.get('/traveler/seats/:seatId', (req, res) =>
{
    seat.findById(req.params.seatId).then(found =>
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

routes.get('/traveler/seats/flights/:flightId', (req, res) =>
{
    seat.findAll({ where: { flightId: req.params.flightId } }).then(found =>
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

routes.post('/traveler/seats', (req, res) =>
{
    seat.create({
        flightId: req.body.flightId,
        seat_num: req.body.seat_num,
        priceClass: req.body.priceClass
    }).then(result =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(result);
    });
});

routes.put('/traveler/seats/:seatId', (req, res) =>
{
    seat.findById(req.params.seatId).then(found =>
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.flightId = req.body.flightId;
            found.seat_num = req.body.seat_num;
            found.priceClass = req.body.priceClass;

            found.save().then(result =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(result);
            });
        }
    });
});

routes.delete('/traveler/seats/:seatId', (req, res) =>
{
    seat.findById(req.params.seatId).then(found =>
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