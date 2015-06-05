var http = require('http'),
	url = require('url');

var parsetimeUrl = '/api/parsetime',	
	unixtimeUrl = '/api/unixtime',
	queryStr = 'iso';

http.createServer( function(req, res) {

}).listen( Number(process.argv[2]) )