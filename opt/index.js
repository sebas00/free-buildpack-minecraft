#!/usr/bin/env nodejs

var net = require('net')
var fs = require('fs')
var Socket = net.Socket
var Server = net.Server

// Get port of ngrok from ngrok.log
var log = fs.readFileSync('ngrok.log', {encoding: 'utf-8'})
var regex = /URL:tcp:\/\/0.tcp.ngrok.io:(\d{5})/g
var port = regex.exec(log)[1]

// Start server to forward to the ngrok minecraft server
var server = new Server()
server.on('connection', function (client) {
  console.log('New server connection')
  var socket = new Socket()
  console.log('Connecting to 0.tcp.ngrok.io:' + port)
  socket.connect(port, '0.tcp.ngrok.io', function () {
    console.log('Server connection successful')
    socket.pipe(client)
    client.pipe(socket)
  })
})

server.listen(process.env.PORT || 25565)
