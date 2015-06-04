var http = require('http')

var url = process.argv[2]

http.get(url, function(response) {

	response.setEncoding('utf8') //make buffer to string

	response.on('data', console.log)

	response.on('error', console.error)

})