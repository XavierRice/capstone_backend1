const stripeSecret = process.env.X_STRIPE_SECRET;
const Stripe = require('stripe')
const stripe = Stripe(stripeSecret);

const testAccount = process.env.X_ACCOUNTNUMBER


async function createStripeAccount(){
    const { user_email } = req.body
    try {
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'custom',
            email: 'xavier.rice@gmail.com',
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

async function createAccountSession(req, res){
    try {
        const accountSession = await stripe.accountSessions.create({
          account: testAccount,
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

          return accountSession.client_secret
       
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account session', error);
        res.status(500);
        res.send({error: error.message});
      }

}



module.exports = { createStripeDonation, createStripeAccount, createAccountSession };