const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;
const stripeSecret = process.env.X_STRIPE_SECRET;


const Stripe = require("stripe")
const stripe = Stripe(stripeSecret)

async function createStripeAccount(){
    try {
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'custom',
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
    } catch (error){
        console.error('Error creating Stripe Account', error.message)
    }
}
createStripeAccount()

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
