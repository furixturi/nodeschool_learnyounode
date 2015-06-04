var http = require('http'),
	bl = require('bl'),
	urls = process.argv.slice(2);


function pipeAndPrint () {
	
	if ( urls.length === 0 ) return

	http.get( urls.shift(), function ( response ) {

		response.pipe( bl( function( err, data ) {

			if( err ) console.error( err )

			console.log( data.toString() );

			pipeAndPrint();

		}))
	})
}

pipeAndPrint();