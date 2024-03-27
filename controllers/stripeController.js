const express = require('express');
require("dotenv").config();

const Stripe = require('stripe');
const stripeSecret = process.env.X_STRIPE_SECRET;
const stripe = Stripe(stripeSecret);

const { createAccountLink} = require('../queries/stripe')
const { stripeWebhook } = require('./stripeWebhooks');

const stripeRoutes = express.Router();


stripeRoutes.post('/v1/accounts', async (req, res) => {

    try {
        const accountLink = await createAccountLink()

        console.log(`Account Link: ${accountLink.url}`)
        res.status(201).json({success:true, url:accountLink.url})

    } catch (err){
        console.error(err)
        res.status(400).json({ success:false, error: err.message });
    }
})

stripeRoutes.post('/create-payment-intent', async (req, res) => {
    const { amount, event_id, user_id } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { event_id, user_id },
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


stripeRoutes.post('/webhook', express.raw({type: 'application/json'}), stripeWebhook);






module.exports = stripeRoutes