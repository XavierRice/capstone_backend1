const express = require('express')
const cors = require('cors')
const app = express()
const usersController = require('./controllers/usersController')
//const eventsController = require('./controllers/eventsController')

// Middleware
app.use(cors())
app.use(express.json())
app.use('/users', usersController)
//app.use('/events', eventsController)


app.get('/', (req, res) => {
    res.json({ index: "Welcome to Impactify" })
})


module.exports = app