var fs = require( 'fs' ),
		path = require( 'path' );


module.exports = function( dir, fileEnding, callback ) {
	
	fs.readdir( dir, function( err, list ) {
		
		if( err ) {
			return callback( err );
		}

		/*var filteredList = [];

		list.forEach( function( file ) {

			if( path.extname( file ) === '.' + fileEnding ) {
				filteredList.push( file );
			}

		} );
*/
		var filteredList = list.filter(function(file) {
			return path.extname(file) === '.' + fileEnding
		})

		callback( null, filteredList );

	} )
}