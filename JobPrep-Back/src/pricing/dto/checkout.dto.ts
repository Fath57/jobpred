import { IsString, IsNumber, IsOptional, IsObject, Min } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsString()
  itemType: 'option' | 'pack';

  @IsString()
  itemId: string;

  @IsNumber()
  @Min(1)
  quantity: number = 1;

  @IsString()
  successUrl: string;

  @IsString()
  cancelUrl: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, string>;
}

export class CheckoutSessionResponseDto {
  sessionId: string;
  url: string;
}

export class VerifyPaymentDto {
  @IsString()
  sessionId: string;
}

export class PaymentStatusResponseDto {
  paid: boolean;
  paymentStatus: string;
  sessionId: string;
  customerEmail?: string;
  amountTotal?: number;
}

