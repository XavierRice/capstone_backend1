const stripe = require('stripe')(process.env.X_STRIPE_SECRET);

const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object; // The payment intent
            const { event_id, user_id } = paymentIntent.metadata;
            
            // Here, call a function to process the payment intent's success,
            // such as recording the donation in your database
            // Example: await recordDonation({ event_id, user_id, amount: paymentIntent.amount });

            console.log(`PaymentIntent for ${event_id} was successful!`);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
};

module.exports = {
    handleStripeWebhook,
};