import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sushilbajpai:sushilbajpai@cluster0.fce4vg7.mongodb.net/nest-stripe-integration?retryWrites=true&w=majority&appName=Cluster0'),
    PaymentsModule,
  ],
})
export class AppModule {}
