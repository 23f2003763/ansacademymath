const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://ansacademymath.in' 
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://ansacademymath.in' 
    : 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`)
  })

  socket.on('private-message', (data) => {
    io.to(`user-${data.receiverId}`).emit('private-message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})