"use strict";

var args = process.argv.splice(2);

var http = require(args[0].substring(0, 5) == 'https' ? 'https' : 'http');
var sys = require('sys');
var net = require('net');
var url = require('url');


var options = url.parse(args[0]);
options.headers = {
	'Connection': 'Upgrade',
	'Upgrade': 'TCPoverHTTP'
};
options.rejectUnauthorized = false;

var req = http.request(options);
req.end();

if(args.length > 1) {
	var listen = parseInt(args[1], 10);
	req.on('upgrade', function(res, socket, head) {
        socket.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
		console.log('Connection established. Listening on localhost:' + listen);
		var server = net.createServer(function(c) {
			c.on('data', function(chunk) {
				socket.write(chunk);
			}).on('end', function() {
				socket.end();
			});
			socket.on('data', function(chunk) {
                
                c.write(chunk);
                
                
			}).on('end', function() {
				// don't shut down the server on socket close
				// c.end();
			});
		});

		server.listen(listen, 'localhost');
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
} else {
	req.on('upgrade', function(res, socket, head) {
		var stdin = process.stdin;
		var stdout = process.stdout;
		stdin.resume();
        socket.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
		socket.on('data', function(chunk) {
			stdout.write(chunk);
		}).on('end', function() {
			// don't close Stdout, it does not make any sense
			// stdout.end();
		});

		stdin.on('data', function(chunk) {
            try{
            socket.write(chunk);}
            catch (error){
                console.log(error);
            }
		}).on('end', function() {
			socket.end();
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
}