var path = require( 'path' );

var osenv = require( 'osenv' );
var mmdbReader = require( 'maxmind-db-reader' );

function getCountry( db ) {

    var countries = null;
    var dbPath = db || path.join( osenv.home() + process.env.npm_package_config_geodb );

    try {
        var countries = mmdbReader.openSync( dbPath );
    } catch ( err ) {
        throw new Error( 'Error opening db at ' + path.resolve( dbPath ) );
    }

    return function *geolocate( next ) {
        var ip = this.ip.match( /[^:]*$/ )[ 0 ];

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
}


module.exports = getCountry;
