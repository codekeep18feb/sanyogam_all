import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentIntentScreen = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from your server
    fetch('/create-payment-intent', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handlePaymentSubmit = async () => {
    // Use stripe.confirmCardPayment to process the payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), // Use CardElement from your form
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else {
      console.log('Payment succeeded:', paymentIntent);
    }
  };

  return (
    <div>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button type="submit">Pay</button>
      </form>
      {/* Rest of your form for card payments */}
    </div>
  );
};

export default PaymentIntentScreen;
