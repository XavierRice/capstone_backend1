

function stripeCSPMiddleware(req, res, next) {
    res.set("Content-Security-Policy", "script-src 'self' 'unsafe-eval' https://connect-js.stripe.com");
    next();
  }
  
  module.exports = {stripeCSPMiddleware}
  