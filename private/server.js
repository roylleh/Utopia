const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use((req, res, next) =>
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.use(require('./controller/flight'));
app.use(require('./controller/reservation'));
app.use(require('./controller/seat'));
app.use(require('./controller/ticket'));
app.use(require('./controller/user'));

app.listen(8081);