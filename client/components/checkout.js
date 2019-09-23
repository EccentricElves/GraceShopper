import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const CURRENCY = 'USD'

const successPayment = data => {
  alert('Payment Successful')
}
const errorPayment = data => {
  alert(data)
}
const onToken = (amount, description) => token => {
  axios
    .post('/api/stripe/checkout', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount
    })
    .then(successPayment)
    .catch(errorPayment)
}

const Checkout = ({name, description, amount}) => {
  return (
    <div>
      <StripeCheckout
        name={name}
        description={description}
        amount={amount}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey="pk_test_Tm68jOcpaletOdKFzp80ochj00YAnOJpLE"
      />

      <Link to="/thankyou">
        <button type="submit" onClick={() => this.handleSubmit()}>
          Check Out
        </button>
      </Link>
    </div>
  )
}

export default Checkout
