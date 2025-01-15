import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { PaymentConfig, PaymentConfigDocument } from './schemas/payment-config.schema';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectModel(PaymentConfig.name) private configModel: Model<PaymentConfigDocument>,
  ) {}

  async createPaymentIntent(amount: number, currency: string) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    return {client_secret: paymentIntent.client_secret};
  }

  async saveConfig(config: Partial<PaymentConfig>) {
    const existingConfig = await this.configModel.findOne();
    if (existingConfig) {
      await this.configModel.updateOne({}, config);
    } else {
      await this.configModel.create(config);
    }
  }
}
