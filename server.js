'use strict';

// Node Server
const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 1234;

app.use( express.static( './public' ));

// Pointing it to start from the root directory of portfolio since it can't find it
app.get('/', (request, response) => {response.sendFile( 'index.html', {root: './public'})});
app.get('/about', (request, response) => {response.sendFile( 'index.html', {root: './public'})});
app.get('/siteinfo', (request, response) => {response.sendFile( 'index.html', {root: './public'})});
app.get('/portfolio', (request, response) => {response.sendFile( 'index.html', {root: './public'})});

// catch a visit to any page that's not allowed and send them to the 404 page
app.get( '*', function( request, response ) {
    response.status(404).sendFile( '/public/404.html', {root: '.'} );
});


app.listen ( PORT, function() {
    console.log( `Listening on ${PORT}` );
});

