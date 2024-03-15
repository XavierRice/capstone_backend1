// stripeEventHandlers.js
const stripe = require("stripe")(process.env.X_STRIPE_SECRET);
const { recordDonation } = require('../queries/donations'); 

async function checkAccountStatus(accountId) {
    try {
        const account = await stripe.accounts.retrieve(accountId);
        return account.charges_enabled && account.details_submitted;
    } catch (error) {
        console.error(`Error checking account status: ${error.message}`);
        throw error;
    }
}

async function processPaymentIntentSuccess(connnectAccountId, paymentIntent) {
    const { event_id, user_id, account_id } = paymentIntent.metadata;
    
    const canReceivePayments = await checkAccountStatus(account_id);
    if (!canReceivePayments) {
        console.error(`Account ${account_id} is not ready to receive payments.`);
        return; // Handle accordingly
    }

    await recordDonation({ event_id, user_id, amount: paymentIntent.amount });
    console.log(`Donation for event_id ${event_id} by user_id ${user_id} was successful!`);
}

module.exports = {
    processPaymentIntentSuccess,
    checkAccountStatus
};
