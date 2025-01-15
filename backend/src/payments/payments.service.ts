import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PaymentsService {

  constructor(
  ) {}

  async createPaymentIntent(amount: number, currency: string) {
    console.log('process.env.STRIPE_SECRET_KEY=', process.env.STRIPE_SECRET_KEY);
    
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const paymentIntent=await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {enabled: true}
    });
    console.log('payment intent-', paymentIntent);
    return paymentIntent;
  }

}
