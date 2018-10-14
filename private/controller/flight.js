const routes = require('express').Router();
const flight = require('../model/flight');

routes.get('/traveler/flights', (req, res) =>
{
    flight.findAll().then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.get('/traveler/flights/:flightId', (req, res) =>
{
    flight.findById(req.params.flightId).then(found =>
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

routes.post('/traveler/flights', (req, res) =>
{
    flight.create({
        flight_num: req.body.flight_num,
        from_airport: req.body.from_airport,
        to_airport: req.body.to_airport,
        departure_date: req.body.departure_date,
        arrival_date: req.body.arrival_date,
        economy_price: req.body.economy_price,
        business_price: req.body.business_price
    }).then(result =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(result);
    });
});

routes.put('/traveler/flights/:flightId', (req, res) =>
{
    flight.findById(req.params.flightId).then(found => 
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.flight_num = req.body.flight_num;
            found.from_airport = req.body.from_airport;
            found.to_airport = req.body.to_airport;
            found.departure_date = req.body.departure_date;
            found.arrival_date = req.body.arrival_date;
            found.economy_price = req.body.economy_price;
            found.business_price = req.body.business_price;

            found.save().then(result =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(result);
            });
        }
    });
});

routes.delete('/traveler/flights/:flightId', (req, res) =>
{
    flight.findById(req.params.flightId).then(found =>
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