const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

//Controllers
const usersController = require('./controllers/usersController')
const eventsController = require('./controllers/eventsController')
const donationsController = require('./controllers/donationsController')
const newsController = require('./controllers/newsController')
const stripeController = require('./controllers/stripeController')
const { stripeCSPMiddleware } = require('./controllers/stripeMiddleware')
const stripeWebhook = require('./controllers/stripeWebhooks')
const combinedController = require('./controllers/combinedController')

// Middleware
app.use(cors())
// Stripe Webhook endpoint must come before express.json()
//app.post('/stripe-webhook', bodyParser.raw({type: 'application/json'}), stripeWebhook);


app.use(express.json())
app.use('/users', usersController)
app.use('/events', eventsController)
app.use('/donations', donationsController)
app.use('/register', usersController)
app.use('/news', newsController)
app.use('/keywords', combinedController)
app.use('/payments', stripeCSPMiddleware, stripeController)


app.get('/', (req, res) => {
    res.send( 'Welcome to Impactify')
})


module.exports = app