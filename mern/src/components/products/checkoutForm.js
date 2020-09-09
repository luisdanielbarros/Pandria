import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(event) => {
      if (!stripe || !elements) return;

      //Get the card element information
      const cardElement = elements.getElement(CardElement);

      //Attempt to create a payment method
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });

      //On failure o create a payment method, report the error
      if (error) console.log('[error]', error);
      else console.log('[PaymentMethod]', paymentMethod);

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button type='submit' disabled={!stripe}>Pay</button>
        </form>
    );
}
export default CheckoutForm;