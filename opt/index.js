#!/usr/bin/env nodejs

var fs = require('fs')
var http = require('http')

// Get port of ngrok from ngrok.log
var log = fs.readFileSync('ngrok.log', {encoding: 'utf-8'})
var regex = /URL:tcp:\/\/0.tcp.ngrok.io:(\d{5})/g
var port = regex.exec(log)[1]

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end('Server Address: 0.tcp.ngrok.io:' + port)
}).listen(process.env.PORT || 8080)

/*
    The *old* client side code to forward a server to localhost
*/

// Start server to forward to the ngrok minecraft server
// var net = require('net')
// var Socket = net.Socket
// var Server = net.Server
// var server = new Server()
// server.on('connection', function (client) {
//   console.log('New server connection')
//   var socket = new Socket()
//   console.log('Connecting to 0.tcp.ngrok.io:' + port)
//   socket.connect(port, '0.tcp.ngrok.io', function () {
//     console.log('Server connection successful')
//     socket.pipe(client)
//     client.pipe(socket)
//   })
// })
// server.listen(process.env.PORT || 25565)
