var net = require( 'net' )
var strftime = require( 'strftime' )

var server = net.createServer( function (socket) {

	socket.end( strftime ('%F %H:%M') )

} )
server.listen( +process.argv[2] )