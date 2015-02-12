
module.exports = geo;

function geo() {

    return function *geolocate( next ) {


        yield next;
    };
}
