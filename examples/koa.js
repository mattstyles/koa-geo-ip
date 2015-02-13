
var app = require( 'koa' )();
var osenv = require( 'osenv' );
var geo = require( '../lib' );

app.use( geo({
    db: osenv.home() + '/.db/geo/country.mmdb'
}));

app.use( function* () {
    this.body = this.geo;
});

app.listen( 3000 );
console.log( 'Listening on 3000' );
