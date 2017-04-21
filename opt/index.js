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
  var socket = new Socket()
  socket.connect(port, '0.tcp.ngrok.io', function () {
    socket.pipe(client)
    client.pipe(socket)
  })
})

server.listen(process.env.PORT || 25565)
