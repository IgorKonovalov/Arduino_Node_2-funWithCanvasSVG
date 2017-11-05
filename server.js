const http = require('http')
const express = require('express')
const app = express()
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline

const port = 3000
const Server = http.createServer(app)
const io = require('socket.io').listen(Server)

app.use(express.static(__dirname + '/public'))

const sPort = new serialport('COM3', {
  baudRate: 9600
})
const parser = new sp_readline()
sPort.pipe(parser)

let dataArr = []

sPort.on('open', () => {
  console.log('Serial Port Opened')
  io.on('connection', socket => {
    console.log('Socket connected')
    socket.emit('connected')
    let counter = 0
    let lastValue = [0, 0, 0]
    parser.on('data', data => {
      counter += 1
      if (counter % 2 === 0) {
        dataArr[counter / 2 - 1] = data
      }
      if (counter === 6) {
        counter = 0
        if (JSON.stringify(lastValue) !== JSON.stringify(dataArr)) {
          socket.emit('data', dataArr)
        }
        lastValue = dataArr.slice()
      }
    })
  })
})

Server.listen(port, () => {
  console.log(`Express server started on ${port}`)
})
