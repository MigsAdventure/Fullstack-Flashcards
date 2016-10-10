const PORT = 8000;

//REQUIRES
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const Card = require('./models/Card');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');


//APP DECLARATION
const app = express();


//GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(express.static('build'));


// WEBPACK CONFIGURATION 
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))

app.use(webpackHotMiddleware(compiler));

//ROUTES

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
})

app.get('/cards', (req, res) => {
  Card.getAll((err, cards) => {
    if (err) return res.status(400).send(err);
    res.send(cards);
  })
})

app.get('/cards/category/:category?', (req,res) => {
  Card.filterCategory(req, (err,flashcard) => {
    if(err) return res.status(400).send(err);
    res.send(flashcard);
  })
})

app.post('/cards', (req, res) => {
  Card.create(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send(req.body)
  })
})

app.delete('/cards/:id', (req, res) => {
  Card.delete(req, (err,cards)   => {
    if(err) return res.status(400).send(err);
     res.send(cards);
  })
 
})

app.put('/cards/:id', (req, res) => {
  
  Card.update(req, err => {
    if(err) return res.status(400).send(err);
  })
  res.send('updated cards');
})


// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})




