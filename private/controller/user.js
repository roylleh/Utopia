const routes = require('express').Router();
const user = require('../model/user');

routes.post('/traveler/users/login', (req, res) =>
{
    user.findOne({ where: { email: req.body.email, password: req.body.password } }).then(found =>
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

routes.get('/traveler/users', (req, res) =>
{
    user.findAll().then(found =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(found);
    });
});

routes.get('/traveler/users/:userId', (req, res) =>
{
    user.findById(req.params.userId).then(found =>
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

routes.post('/traveler/users', (req, res) =>
{
    user.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role
    }).then(result =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(result);
    });
});

routes.put('/traveler/users/:userId', (req, res) =>
{
    user.findById(req.params.userId).then(found => 
    {
        if (found === null)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.send({ Result: 'Unable to find content.' });
        }
        else
        {
            found.email = req.body.email;
            found.password = req.body.password;
            found.name = req.body.name;
            found.role = req.body.role;

            found.save().then(found =>
            {
                res.setHeader('Content-Type', 'application/json');
                res.send(found);
            });
        }
    });
});

routes.delete('/traveler/users/:userId', (req, res) =>
{
    user.findById(req.params.userId).then(found =>
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