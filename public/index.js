const socket = io.connect('http://localhost:3000')

socket.on('connected', () => {
  console.log('Socket Connected')
})
socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})
let dataArr = []
socket.on('data', data => {
  dataArr = data
    .map(el => el.trim())
    .map(Number)
    .map(el => el / 4)
    .map(Math.floor)
  console.log(dataArr)
  document.body.setAttribute(
    'style',
    `background-color: rgb(${dataArr[0] / 4}, ${dataArr[1] / 4}, ${dataArr[2] / 4})`
  )
})
