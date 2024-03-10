const express = require('express');
require("dotenv").config()
const stripeRoutes = express.Router()
const Stripe = require('stripe')

const stripeSecret = process.env.X_STRIPE_SECRET;
const stripe = Stripe(stripeSecret);

stripeRoutes.use(express.json());

async function createStripeAccount(){
    const { user_email } = req.body
    try {
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'custom',
            email: 'user.email',
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
            },
          });
          console.log(`Stripe Account Created: ${account?.id}` )
        
          const stripe_donation = { id: account.id, }
    } catch (error){
        console.error('Error creating Stripe Account', error.message)
    }
} //working route


async function createStripeDonation(req, res) {
    const { amount, currency, source, accountId } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount: amount, 
            currency: currency,
            source: source, // A valid source ID
            destination: {
                account: accountId,
            },
        });
        res.status(200).json({ message: 'Donation processed successfully', chargeId: charge.id });
        return true
    } catch (error) {
        console.error('Error creating donation', error.message);
        res.status(500).json({ error: error.message });
        return false
    }
}

async function createAccountSession( req, res){
 const { account_id } = req.body
    try {
        const accountSession = await stripe.accountSessions.create({
          account: account_id,
          components: {
            payments: {
              enabled: true,
              features: {
                refund_management: true,
                dispute_management: true,
                capture_payments: true,
              }
            },
          }
        });
    
        res.json({
          client_secret: accountSession.client_secret,
        });
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
      }

}


module.exports = { createStripeDonation, createStripeAccount };