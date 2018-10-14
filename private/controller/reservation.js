const routes = require('express').Router();
const reservation = require('../model/reservation');

routes.get('/traveler/reservations', (req, res) =>
{
    reservation.findAll().then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.get('/traveler/reservations/:reservationId', (req, res) =>
{
    reservation.findById(req.params.reservationId).then(found =>
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

routes.get('/traveler/reservations/users/:userId', (req, res) =>
{
    reservation.findAll({ where: { userId: req.params.userId } }).then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.post('/traveler/reservations', (req, res) =>
{
    reservation.create({
        userId: req.body.userId,
        reservation_num: req.body.reservation_num,
        book_date: req.body.book_date
    }).then(result =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(result);
    });
});

routes.put('/traveler/reservations/:reservationId', (req, res) =>
{
    reservation.findById(req.params.reservationId).then(found => 
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.userId = req.body.userId;
            found.reservation_num = req.body.reservation_num;
            found.book_date = req.body.book_date;

            found.save().then(result =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(result);
            });
        }
    });
});

routes.delete('/traveler/reservations/:reservationId', (req, res) =>
{
    reservation.findById(req.params.reservationId).then(found =>
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