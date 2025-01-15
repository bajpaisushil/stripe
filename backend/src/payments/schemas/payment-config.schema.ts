import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentConfigDocument = PaymentConfig & Document;

@Schema()
export class PaymentConfig {
  @Prop({ required: true })
  stripeApiKey: string;

  @Prop()
  alternativeGatewayUrl?: string;
}

export const PaymentConfigSchema = SchemaFactory.createForClass(PaymentConfig);

