const express = require('express');
require("dotenv").config();
const stripeRoutes = express.Router();
const Stripe = require('stripe');
const { createStripeDonation, createStripeAccount, createAccountSession} = ('../queries/stripe')

//creating user account session
stripeRoutes.get('/', async (req, res) => {
    
    try {
        const clientSecret= await createAccountSession(); 
        res.status(200).json({client_secret: clientSecret});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

