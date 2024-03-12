const express = require('express');
require("dotenv").config();
const stripeRoutes = express.Router();
const Stripe = require('stripe');
const { createStripeDonation, createStripeAccount, createAccountSession , createAccountLink} = require('../queries/stripe')

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

stripeRoutes.post('/', async (req, res) => {

    try {
        const stripeAccLink = await createAccountLink()
        res.status(200).json(stripeAccLink);
    } catch (err){
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = stripeRoutes