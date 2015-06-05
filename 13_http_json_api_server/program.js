var http = require('http'),
	url = require('url');

var parsetimeUrl = '/api/parsetime',	
	unixtimeUrl = '/api/unixtime',
	queryKey = 'iso';

http.createServer( function(req, res) {
	
	var parsedUrl = url.parse(req.url, true);

	var route = parsedUrl.pathname,
		queryVal = parsedUrl.query[queryKey];

	var date = new Date(queryVal),
		resJson;

	if( route === parsetimeUrl ) {
		resJson = {
			"hour" : date.getHours(),
			"minute" : date.getMinutes(),
			"second" : date.getSeconds()
		}
	} else if ( route === unixtimeUrl ) {
		resJson = {
			"unixtime" : date.getTime()
		}
	}

	if( resJson ) {
		res.writeHead(200, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(resJson))
	} else {
		res.writeHead(404)
		res.end()
	}

	

}).listen( Number(process.argv[2]) )