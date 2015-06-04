var fs = require('fs'),
	path = require('path'),
	dirPath = process.argv[2],
	filterEnd = '.' + process.argv[3];

fs.readdir(dirPath, function (err, list) {
	
	if( err ) throw err;

	for(var i in list) {
		if( path.extname( list[i] ) === filterEnd ) {
			console.log( list[i] );
		}
	}
})