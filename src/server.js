require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const flowApi = require('./flowApi/flowApi');
const requestIp = require('request-ip');
const cors = require('cors');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const port = process.env.PORT || 4000;
app.use(cors({ origin: '*' }));

app.set('views', __dirname + '/views');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));



app.use(requestIp.mw({ attributeName: 'userIp' }))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Weather API',
        welcomeMessage: 'Welcome to weather API site',
        showWeatherLinks: true
    });
});


app.post('/saveFlow', (req, res) => {
    const flowItems = req.body.flowItems;
    const flowName = req.body.flowName;

    console.log(req.body)
    flowApi.saveFlow(flowName,flowItems).then(doc => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/getFlow/:flowName', (req, res) => {
    const flowName = req.params.flowName;
    console.log(flowName)
    flowApi.getFlow(flowName).then(doc => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Weather API',
        currentYear: new Date().getFullYear()
    });
});

app.get('/PageNotFound', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
    });
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});


module.exports = {
    app
}

