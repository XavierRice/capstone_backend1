const express = require('express');
require("dotenv").config();
const stripeRoutes = express.Router();
const stripeSecret = process.env.X_STRIPE_SECRET;
const Stripe = require('stripe');
const stripe = Stripe(stripeSecret);
const { createAccountLink} = require('../queries/stripe')
const { handleStripeWebhook } = require('./stripeWebhooks');
//creating user account session
// stripeRoutes.post('/', async (req, res) => {
    
//     try {
//         const clientSecret= await createAccountSession(); 
//         res.status(200).json({client_secret: clientSecret});
//         console.log(clientSecret)
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });




stripeRoutes.post('/v1/account_links', async (req, res) => {

    try {
        const accountLink = await createAccountLink()
        console.log(`This should be the account: ${accountLink}`)
        res.status(201).json({success:true, client_secret:accountLink.url})
    } catch (err){
        console.error(err)
        res.status(400).json({ success:false, err });
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


stripeRoutes.post('/webhook', express.raw({type: 'application/json'}), handleStripeWebhook);






module.exports = stripeRoutes