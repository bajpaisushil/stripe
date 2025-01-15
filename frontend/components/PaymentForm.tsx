"use client";

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';

// Load Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setMessage('Card Element not found.');
      setLoading(false);
      return;
    }

    try {
      // Create a payment intent using the NestJS backend
      const { data: clientSecret } = await axios.post(
        'http://localhost:8000/payments/create-intent', // Adjust URL if deployed
        {
          amount: 1000, // Example: $10.00
          currency: 'usd',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setMessage(error.message || 'Payment failed.');
      } else if (paymentIntent) {
        setMessage('Payment successful!');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Payment</h2>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
        className="p-3 border rounded-md mb-4"
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 px-4 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Processing...' : 'Pay $10.00'}
      </button>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CheckoutForm />
    </div>
  </Elements>
);

export default PaymentPage;
