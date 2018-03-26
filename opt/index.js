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
