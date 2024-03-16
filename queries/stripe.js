const express = require('express')
const stripeSecret = process.env.X_STRIPE_SECRET;
const Stripe = require('stripe')
const stripe = Stripe(stripeSecret);

const testAccount = process.env.X_ACCOUNTNUMBER

async function createAccountLink(){

  try {
    const account = await stripe.accounts.create({
      type:'standard',
      country: 'US',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      //this is where we could fill users data preonboarding. 
    });

    const AccountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.BACKEND_URL}/verify-wallet?account_id=${account.id}`,
      return_url: `${process.env.BACKEND_URL}/verify-wallet?account_id=${account.id}`,
      type: 'account_onboarding',
    })
    const { url } = AccountLinks
    console.log(AccountLinks)
    return AccountLinks
  }catch(error){
    console.error('Error creating account link', error)
    throw error;
  }
}

async function customerBuySession(){

  const customerSession = await stripe.customerSessions.create({
    customer: '{{CUSTOMER_ID}}',
    components: {
      buy_button: {
        enabled: true,
      },
    },
  });
}



module.exports = { createAccountLink };