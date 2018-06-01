"use strict";

var args = process.argv.splice(2);
var server = 'https://sdm-minecraft.herokuapp.com';
var port = '50001';
var http = require('https');
var sys = require('sys');
var net = require('net');
var url = require('url');


var options = url.parse('https://sdm-minecraft.herokuapp.com');
options.headers = {
	'Connection': 'Upgrade',
	'Upgrade': 'TCPoverHTTP'
};
options.rejectUnauthorized = false;

var req = http.request(options);
req.end();

if(args.length == 0) {
	var listen = 50001;
	req.on('upgrade', function(res, socket, head) {
        socket.on('error', function(e) {
            console.log('problem with request on upgrade request: ' + e.message);
        });
        
        
		console.log('Connection established. Listening on localhost:' + listen);
		
		var server = net.createServer(function(c) {
			c.on('data', function(chunk) {
				socket.write(chunk);
			}).on('end', function() {
				socket.end();
			}).on('error', function(e) {
		console.log('problem with request - remote socketwrite: ' + e.message);
		socket.end();
	});;
			socket.on('data', function(chunk) {
                
                c.write(chunk);
                
                
			}).on('end', function() {
				// don't shut down the server on socket close
				// c.end();
			}).on('error', function(e) {
		console.log('problem with request - local c writing: ' + e.message);
	});;
		});

		server.listen(listen, 'localhost');
	}).on('error', function(e) {
		console.log('problem with request-er1: ' + e.message);
	});
} else {
	req.on('upgrade', function(res, socket, head) {
		var stdin = process.stdin;
		var stdout = process.stdout;
		stdin.resume();
        socket.on('error', function(e) {
            console.log('problem with request-er2: ' + e.message);
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
		console.log('problem with request - er3: ' + e.message);
	});
}