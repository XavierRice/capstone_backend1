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




stripeRoutes.post('/', async (req, res) => {

    try {
        const url = await createAccountLink()
        console.log(url)
        res.status(201).json({success:true, url:url});
    } catch (err){
        console.error(err)
        res.status(400).json({ success:false, err });
    }
})


module.exports = stripeRoutes