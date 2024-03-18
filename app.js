const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
    }
  });

//Controllers
const usersController = require('./controllers/usersController')
const eventsController = require('./controllers/eventsController')
const donationsController = require('./controllers/donationsController')
const newsController = require('./controllers/newsController')
const stripeController = require('./controllers/stripeController')
const { stripeCSPMiddleware } = require('./controllers/stripeMiddleware')

// Middleware
app.use(cors())
app.use(express.json())
app.use('/users', usersController)
app.use('/events', eventsController)
app.use('/donations', donationsController)
app.use('/register', usersController)
app.use('/news', newsController)
app.use('/payments', stripeCSPMiddleware, stripeController)

// socket.IO SERVER
io.on('connection', (socket) => {
    console.log('user connection baby!');
    socket.emit('testEvent', { msg: 'Hello from server!' });
    socket.on('disconnect', ()=>{
        console.log('we have disconnected you & me')
    });
});

setInterval(() => {
    io.emit('heartbeat', { timestamp: Date.now() });
}, 10000)

app.get('/', (req, res) => {
    res.send( 'Welcome to Impactify')
})


module.exports = app