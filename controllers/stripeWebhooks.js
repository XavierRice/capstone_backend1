const stripe = require("stripe")(process.env.X_STRIPE_SECRET);
const {
  processPaymentIntentSuccess,
  checkAccountStatus,
} = require("./stripeEventHandlers");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_ENDPT
    );

    switch (event.type) {
      case "account.updated":
        const accountStatus = event.data.object;
        await checkAccountStatus(accountStatus );
        app.io.emit("accountUpdated", { message: "Account status updated.", accountStatus });
        break;

      case "account.external_account.created":
        const accountExternalAccountCreated = event.data.object;
        app.io.emit("externalAccountCreated", { message: "External account created.", accountExternalAccountCreated });
        // Then define and call a function to handle the event account.external_account.created
        break;

      case "charge.succeeded":
        const chargeSucceeded = event.data.object;
        app.io.emit("chargeSucceeded", { message: "Charge succeeded.", chargeSucceeded });
        // Then define and call a function to handle the event charge.succeeded
        break;

      case "payment_intent.payment_failed":
        const paymentIntentPaymentFailed = event.data.object;
        app.io.emit("paymentFailed", { message: "Payment failed.", paymentIntentPaymentFailed });
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;

      case "payment_intent.succeeded":
        const paymentIntent= event.data.object;
        const connnectAccountId = event.account;
        await processPaymentIntentSuccess( connnectAccountId, paymentIntent);
        app.io.emit("paymentSuccess", { message: "Payment was successful!", paymentIntent });
        break;

      case "payment_link.created":
        const paymentLinkCreated = event.data.object;
        // Then define and call a function to handle the event payment_link.created
        app.io.emit("paymentLinkCreated", { message: "Payment link created.", paymentLinkCreated });
        break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true });
  } catch (err) {
    console.log(`Webhook is busted: ${err.message}`);
    res.status(400).send(`Webhook is busted: ${err.message}`);
  }
};

module.exports = {
  stripeWebhook,
};
