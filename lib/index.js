var path = require( 'path' );

var defaults = require( 'lodash.defaults' );
var osenv = require( 'osenv' );
var mmdbReader = require( 'maxmind-db-reader' );

module.exports = function geoip( options ) {

    var opts = defaults( options, {
        db: path.join( osenv.home() + process.env.npm_package_config_geodb )
    });

    try {
        var countries = mmdbReader.openSync( opts.db );
    } catch ( err ) {
        throw new Error( 'Error opening db at ' + path.resolve( opts.db ) );
    }

    return function *geolocate( next ) {
        var ip;
        if (opts.ip) {
          ip = opts.ip.bind(this)();
        }
        else {
          ip = this.ip.match( /[^:]*$/ )[ 0 ];
        }
        try {
            this.geo = countries.getGeoDataSync( ip || this.ip ) || {};
        } catch ( err ) {
            this.geo = {};
            throw new Error( 'Error getting geolocation data' );
        }

        if ( next ) {
            yield *next;
        }
    };
};
