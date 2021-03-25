const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const appConfig = require('./config');
const appRoutes = require('./routes/app-routes');


// connect MongoDB
mongoose.connect(appConfig.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// request body parser (extended: true => support nested object)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static public
app.use(express.static(path.join(__dirname, 'public')));


// app routes
app.use('/', appRoutes);

// 404: Page not found
app.use('*', (request, response) => {
    response.render(path.join(__dirname, 'views', 'error', '404-page.ejs'));
});


app.listen(appConfig.serverPort, (request, response) => {
    console.log(`Server is Running on :${appConfig.serverPort}`);
});