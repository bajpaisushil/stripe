import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './stripe/stripe.module';

@Module({
    imports: [ConfigModule.forRoot(), StripeModule],
})
export class AppModule {}
