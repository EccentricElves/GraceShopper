const configureStripe = require('stripe')
const stripe = configureStripe(
  'sk_test_7LYfDNpQFLahVJ4RjeDMYHx8005rlHAc8D' // secret key
)
const router = require('express').Router()

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.post('/checkout', (req, res, next) => {
  try {
    stripe.charges.create(req.body, postStripeCharge(res))
  } catch (error) {
    next(error)
  }
})

module.exports = router
