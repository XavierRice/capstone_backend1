const express = require('express');
require("dotenv").config();
const stripeRoutes = express.Router();
const Stripe = require('stripe');
const { createAccountLink} = require('../queries/stripe')

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
        res.status(201).redirect(accountLink.url)
    } catch (err){
        console.error(err)
        res.status(400).json({ success:false, err });
    }
})


module.exports = stripeRoutes