const PORT = 8000;

//REQUIRES
const path = require('path');
const morgan = require('morgan');
const express = require('express');
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


// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})