import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingWebhookController } from './pricing-webhook.controller';
import { PricingService } from './pricing.service';
import { PrismaService } from '../shared/prisma/prisma.service';
import { StripeModule } from '../shared/stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [PricingController, PricingWebhookController],
  providers: [PricingService, PrismaService],
})
export class PricingModule {}