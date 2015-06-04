var fs = require('fs'),
	path = process.argv[2],
	buffer = fs.readFileSync(path),
	str = buffer.toString(),
	splited = str.split('\n'),
	numNewLines = splited.length-1;

console.log(numNewLines);

