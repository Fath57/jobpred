import {
  Controller,
  Post,
  Req,
  Headers,
  BadRequestException,
  Logger,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { StripeService } from '../shared/stripe/stripe.service';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { Request } from 'express';

@ApiTags('Stripe Webhooks')
@Controller('webhooks')
@SkipAuth()
export class PricingWebhookController {
  private readonly logger = new Logger(PricingWebhookController.name);

  constructor(private readonly stripeService: StripeService) {}

  @Post('stripe')
  @ApiExcludeEndpoint() // Hide from Swagger docs for security
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid signature or payload' })
  async handleStripeWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    try {
      // Get raw body for signature verification
      const rawBody = request.rawBody;

      if (!rawBody) {
        throw new BadRequestException('Missing raw body');
      }

      // Verify and construct the event
      const event = this.stripeService.constructWebhookEvent(rawBody, signature);

      // Handle different event types
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutSessionCompleted(event.data.object);
          break;

        case 'checkout.session.async_payment_succeeded':
          await this.handleAsyncPaymentSucceeded(event.data.object);
          break;

        case 'checkout.session.async_payment_failed':
          await this.handleAsyncPaymentFailed(event.data.object);
          break;

        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(event.data.object);
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentIntentFailed(event.data.object);
          break;

        default:
          this.logger.log(`Unhandled event type: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Webhook error: ${errorMessage}`);
      throw new BadRequestException('Webhook signature verification failed');
    }
  }

  /**
   * Handle successful checkout session completion
   */
  private async handleCheckoutSessionCompleted(session: any) {
    this.logger.log(`Checkout session completed: ${session.id}`);
    this.logger.log(`Customer email: ${session.customer_details?.email}`);
    this.logger.log(`Payment status: ${session.payment_status}`);
    this.logger.log(`Amount: ${session.amount_total / 100}€`);

    // Extract metadata
    const metadata = session.metadata;
    if (metadata) {
      this.logger.log(`Item type: ${metadata.itemType}`);
      this.logger.log(`Item ID: ${metadata.itemId}`);
    }

    // TODO: Add your business logic here
    // Examples:
    // - Create an order in the database
    // - Send confirmation email
    // - Update user credits
    // - Grant access to purchased items
  }

  /**
   * Handle async payment succeeded
   */
  private async handleAsyncPaymentSucceeded(session: any) {
    this.logger.log(`Async payment succeeded: ${session.id}`);
    // TODO: Add your business logic here
  }

  /**
   * Handle async payment failed
   */
  private async handleAsyncPaymentFailed(session: any) {
    this.logger.log(`Async payment failed: ${session.id}`);
    // TODO: Add your business logic here (e.g., notify customer)
  }

  /**
   * Handle payment intent succeeded
   */
  private async handlePaymentIntentSucceeded(paymentIntent: any) {
    this.logger.log(`Payment intent succeeded: ${paymentIntent.id}`);
    // TODO: Add your business logic here
  }

  /**
   * Handle payment intent failed
   */
  private async handlePaymentIntentFailed(paymentIntent: any) {
    this.logger.log(`Payment intent failed: ${paymentIntent.id}`);
    this.logger.error(`Failure reason: ${paymentIntent.last_payment_error?.message}`);
    // TODO: Add your business logic here (e.g., notify customer)
  }
}

