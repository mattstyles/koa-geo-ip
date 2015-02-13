# koa-geo-ip

> Uses ip to geolocate requests


## Getting Started

```
npm i koa-geo-ip
```


## Example

Example using as koa middleware

```js
var app = require( 'koa' )();
var geo = require( 'koa-geo-ip' );

app.use( geo() );

app.use( function* () {
  this.body = this.geo;
});

app.listen( 3000 );
```

Example using co to access the generator

```js
var co = require( 'co' );
var geoip = require( 'koa-geo-ip' );
var geolocate = geoip();

co( function *() {
  var location = {
    ip: '8.8.8.8'
  };
  yield gg.call( location );
  return location.geo;
})
  .then( function( loc ) {
    console.log( loc );
  });
```

### Result (excerpt)

```js
{
  country: {
    geoname_id: 6252001,
    iso_code: 'US'
  }
}
```


## Running the examples

You’ll be needing the db, there’s a script included for that

```
npm run geoip

node examples/co.js
node examples/koa.js
```


## API

### Options

__db__ <_String_> path to the MaxMind GeoLite2 database

The __db__ path can also be specified using the `package.json`, see this repo’s package for an example. Both the install script and the module will use the `package` info if run via `npm`, otherwise specify the path.


## Install Script

Included is a quick script to download the database, by default it’ll use the path specified in the `package.json` if run via `npm`, use `--db` to specify a path.

`node bin/geoip --db path/to/db` specify a path
`node bin/geoip --update` will force a db update


## License

WTFPL

Copyright (c) 2015, Matt Styles

> This product includes GeoLite2 data created by MaxMind, available from  [http://www.maxmind.com](http://www.maxmind.com)
