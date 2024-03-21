const http = require('http');
const { Server } = require('socket.io')
const app = require("./app");
require("dotenv").config();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
      origin: "*", // Adjust in production
      methods: ["GET", "POST"],
      credentials: true
  }
});

app.io = io

// Setup WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('testEvent', { msg: 'Hello from server!' });

  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

// Optional: Emit heartbeat every 10 seconds
setInterval(() => {
  io.emit('heartbeat', { timestamp: Date.now() });
}, 10000);

const PORT = process.env.PORT || 4000;


server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
