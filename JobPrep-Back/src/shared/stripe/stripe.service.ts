import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    
    if (!apiKey) {
      this.logger.warn('STRIPE_SECRET_KEY not found in environment variables');
    }

    this.stripe = new Stripe(apiKey || '', {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Create a Stripe Product
   */
  async createProduct(name: string, description: string): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({
        name,
        description,
      });

      this.logger.log(`Product created: ${product.id} - ${name}`);
      return product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating product: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Update a Stripe Product
   */
  async updateProduct(
    productId: string,
    data: { name?: string; description?: string; active?: boolean },
  ): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.update(productId, data);

      this.logger.log(`Product updated: ${product.id}`);
      return product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating product: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Archive a Stripe Product
   */
  async archiveProduct(productId: string): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.update(productId, {
        active: false,
      });

      this.logger.log(`Product archived: ${product.id}`);
      return product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error archiving product: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Create a Stripe Price for a Product (one-time payment in EUR)
   */
  async createPrice(
    productId: string,
    amountInEuros: number,
  ): Promise<Stripe.Price> {
    try {
      const price = await this.stripe.prices.create({
        product: productId,
        unit_amount: Math.round(amountInEuros * 100), // Convert to cents
        currency: 'eur',
      });

      this.logger.log(`Price created: ${price.id} - ${amountInEuros}€`);
      return price;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating price: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Update a Stripe Price (by creating a new one and archiving the old)
   * Note: Stripe prices are immutable, so we need to create a new one
   */
  async updatePrice(
    productId: string,
    oldPriceId: string,
    newAmountInEuros: number,
  ): Promise<Stripe.Price> {
    try {
      // Archive old price
      await this.stripe.prices.update(oldPriceId, {
        active: false,
      });

      // Create new price
      const newPrice = await this.createPrice(productId, newAmountInEuros);

      this.logger.log(`Price updated: old ${oldPriceId} -> new ${newPrice.id}`);
      return newPrice;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating price: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Create a Checkout Session
   */
  async createCheckoutSession(
    priceId: string,
    quantity: number,
    successUrl: string,
    cancelUrl: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
      });

      this.logger.log(`Checkout session created: ${session.id}`);
      return session;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating checkout session: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Retrieve a Checkout Session
   */
  async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error retrieving checkout session: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Construct webhook event from raw body and signature
   */
  constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
  ): Stripe.Event {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET not configured');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      return event;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Webhook signature verification failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Get the Stripe instance (for advanced use cases)
   */
  getStripeInstance(): Stripe {
    return this.stripe;
  }
}

