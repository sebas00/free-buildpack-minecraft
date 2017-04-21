#!/usr/bin/env node

const net = require('net')
const fs = require('fs')
const Socket = net.Socket
const Server = net.Server

// Get port of ngrok from ngrok.log
const log = fs.readFileSync('ngrok.log', {encoding: 'utf-8'})
const regex = /URL:tcp:\/\/0.tcp.ngrok.io:(\d{5})/g
const port = regex.exec(log)[1]

// Start server to forward to the ngrok minecraft server
let server = new Server()
server.on('connection', (client) => {
  var socket = new Socket()
  socket.connect(port, '0.tcp.ngrok.io', () => {
    socket.pipe(client)
    client.pipe(socket)
  })
})

server.listen(process.env.PORT || 25565)
