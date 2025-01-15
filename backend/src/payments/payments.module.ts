import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentConfig, PaymentConfigSchema } from './schemas/payment-config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentConfig.name, schema: PaymentConfigSchema }]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
