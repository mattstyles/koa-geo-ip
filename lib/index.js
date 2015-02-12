var path = require( 'path' );

var osenv = require( 'osenv' );
var mmdbReader = require( 'maxmind-db-reader' );

var geo = mmdbReader.openSync( path.join( osenv.home() + process.env.npm_package_config_geodb ) );

function getGeo() {

    return function *geolocate( next ) {

        try {
            this.geo = geo.getGeoDataSync( this.ip ) || {};
        } catch ( err ) {
            this.geo = {};
            throw new Error( 'Error getting geolocation data' );
        }

        yield next;
    };
}


module.exports = getGeo;
