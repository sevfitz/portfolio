'use strict';

const express = require( 'express' );

const app = express();

const PORT = process.env.PORT || 3000;

app.use( express.static( './public' ));

// app.get( '/', function( request, response ) {
//     response.sendFile( './public/index.html' );
// });

// Pointing it to start from the root directory of portfolio since it can't find it
app.get( '*', function( request, response ) {
    response.status(404).sendFile( '/public/404.html', {root: '.'} );
});

app.listen ( PORT, function() {
    console.log( `Listening on ${PORT}` );
});