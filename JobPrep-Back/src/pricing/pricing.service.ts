import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { StripeService } from '../shared/stripe/stripe.service';
import { CreateOptionDto, UpdateOptionDto } from './dto/option.dto';
import { CreatePackDto, UpdatePackDto } from './dto/pack.dto';
import { CreateCheckoutSessionDto, CheckoutSessionResponseDto, PaymentStatusResponseDto } from './dto/checkout.dto';
import { PaginatedResult } from '../shared/types/pagination.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  // Options CRUD
  async createOption(createOptionDto: CreateOptionDto) {
    try {
      // Create Stripe product and price
      const stripeProduct = await this.stripeService.createProduct(
        createOptionDto.name,
        createOptionDto.description,
      );

      const stripePrice = await this.stripeService.createPrice(
        stripeProduct.id,
        createOptionDto.amount,
      );

      // Create option in database with Stripe IDs
      return await this.prisma.option.create({
        data: {
          ...createOptionDto,
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Un code d\'option avec ce nom existe déjà');
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating option: ${errorMessage}`);
      throw error;
    }
  }

  async findAllOptions(
    page: number = 1,
    perPage: number = 10,
    search?: string,
  ): Promise<PaginatedResult<any>> {
    const skip = (page - 1) * perPage;

    const where: Prisma.OptionWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    const [total, options] = await Promise.all([
      this.prisma.option.count({ where }),
      this.prisma.option.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: perPage,
      }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
      data: options,
      meta: {
        total,
        page,
        perPage,
        totalPages,
      },
    };
  }

  async findOptionById(id: string) {
    const option = await this.prisma.option.findUnique({
      where: { id },
    });

    if (!option) {
      throw new NotFoundException('Option non trouvée');
    }

    return option;
  }

  async updateOption(id: string, updateOptionDto: UpdateOptionDto) {
    const existingOption = await this.findOptionById(id);

    try {
      // Update Stripe product if name or description changed
      if (updateOptionDto.name || updateOptionDto.description) {
        if (existingOption.stripeProductId) {
          await this.stripeService.updateProduct(existingOption.stripeProductId, {
            name: updateOptionDto.name,
            description: updateOptionDto.description,
          });
        }
      }

      // Update Stripe price if amount changed
      let newStripePriceId = existingOption.stripePriceId;
      if (updateOptionDto.amount && updateOptionDto.amount !== existingOption.amount) {
        if (existingOption.stripeProductId && existingOption.stripePriceId) {
          const newPrice = await this.stripeService.updatePrice(
            existingOption.stripeProductId,
            existingOption.stripePriceId,
            updateOptionDto.amount,
          );
          newStripePriceId = newPrice.id;
        }
      }

      return await this.prisma.option.update({
        where: { id },
        data: {
          ...updateOptionDto,
          ...(newStripePriceId !== existingOption.stripePriceId && {
            stripePriceId: newStripePriceId,
          }),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Un code d\'option avec ce nom existe déjà');
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating option: ${errorMessage}`);
      throw error;
    }
  }

  async deleteOption(id: string) {
    const option = await this.findOptionById(id);

    try {
      // Archive Stripe product
      if (option.stripeProductId) {
        await this.stripeService.archiveProduct(option.stripeProductId);
      }

      return await this.prisma.option.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error deleting option: ${errorMessage}`);
      throw error;
    }
  }

  // Packs CRUD
  async createPack(createPackDto: CreatePackDto) {
    try {
      const { options, ...packData } = createPackDto;

      // Create Stripe product and price
      const stripeProduct = await this.stripeService.createProduct(
        packData.name,
        packData.description,
      );

      const stripePrice = await this.stripeService.createPrice(
        stripeProduct.id,
        packData.amount,
      );

      // Create pack in database with Stripe IDs
      const pack = await this.prisma.pack.create({
        data: {
          ...packData,
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
        },
      });

      if (options && options.length > 0) {
        await this.prisma.packOption.createMany({
          data: options.map(option => ({
            packId: pack.id,
            optionId: option.optionId,
            quantity: option.quantity,
          })),
        });
      }

      return await this.findPackById(pack.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Un code de pack avec ce nom existe déjà');
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating pack: ${errorMessage}`);
      throw error;
    }
  }

  async findAllPacks(
    page: number = 1,
    perPage: number = 10,
    search?: string,
  ): Promise<PaginatedResult<any>> {
    const skip = (page - 1) * perPage;

    const where: Prisma.PackWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    const [total, packs] = await Promise.all([
      this.prisma.pack.count({ where }),
      this.prisma.pack.findMany({
        where,
        include: {
          packOptions: {
            include: {
              option: true,
            },
          },
        },
        orderBy: { name: 'asc' },
        skip,
        take: perPage,
      }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
      data: packs,
      meta: {
        total,
        page,
        perPage,
        totalPages,
      },
    };
  }

  async findPackById(id: string) {
    const pack = await this.prisma.pack.findUnique({
      where: { id },
      include: {
        packOptions: {
          include: {
            option: true,
          },
        },
      },
    });

    if (!pack) {
      throw new NotFoundException('Pack non trouvé');
    }

    return pack;
  }

  async updatePack(id: string, updatePackDto: UpdatePackDto) {
    const existingPack = await this.findPackById(id);

    try {
      const { options, ...packData } = updatePackDto;

      // Update Stripe product if name or description changed
      if (packData.name || packData.description) {
        if (existingPack.stripeProductId) {
          await this.stripeService.updateProduct(existingPack.stripeProductId, {
            name: packData.name,
            description: packData.description,
          });
        }
      }

      // Update Stripe price if amount changed
      let newStripePriceId = existingPack.stripePriceId;
      if (packData.amount && packData.amount !== existingPack.amount) {
        if (existingPack.stripeProductId && existingPack.stripePriceId) {
          const newPrice = await this.stripeService.updatePrice(
            existingPack.stripeProductId,
            existingPack.stripePriceId,
            packData.amount,
          );
          newStripePriceId = newPrice.id;
        }
      }

      const pack = await this.prisma.pack.update({
        where: { id },
        data: {
          ...packData,
          ...(newStripePriceId !== existingPack.stripePriceId && {
            stripePriceId: newStripePriceId,
          }),
        },
      });

      if (options !== undefined) {
        await this.prisma.packOption.deleteMany({
          where: { packId: id },
        });

        if (options.length > 0) {
          await this.prisma.packOption.createMany({
            data: options.map(option => ({
              packId: id,
              optionId: option.optionId,
              quantity: option.quantity,
            })),
          });
        }
      }

      return await this.findPackById(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Un code de pack avec ce nom existe déjà');
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating pack: ${errorMessage}`);
      throw error;
    }
  }

  async deletePack(id: string) {
    const pack = await this.findPackById(id);

    try {
      // Archive Stripe product
      if (pack.stripeProductId) {
        await this.stripeService.archiveProduct(pack.stripeProductId);
      }

      return await this.prisma.pack.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error deleting pack: ${errorMessage}`);
      throw error;
    }
  }

  // Méthodes utilitaires
  async getPackOptions(packId: string) {
    return await this.prisma.packOption.findMany({
      where: { packId },
      include: {
        option: true,
      },
    });
  }

  async addOptionToPack(packId: string, optionId: string, quantity: number = 1) {
    await this.findPackById(packId);
    await this.findOptionById(optionId);

    return await this.prisma.packOption.upsert({
      where: {
        packId_optionId: {
          packId,
          optionId,
        },
      },
      update: { quantity },
      create: {
        packId,
        optionId,
        quantity,
      },
    });
  }

  async removeOptionFromPack(packId: string, optionId: string) {
    await this.findPackById(packId);
    await this.findOptionById(optionId);

    return await this.prisma.packOption.delete({
      where: {
        packId_optionId: {
          packId,
          optionId,
        },
      },
    });
  }

  // Checkout methods
  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponseDto> {
    const { itemType, itemId, quantity, successUrl, cancelUrl, metadata } = createCheckoutSessionDto;

    try {
      let stripePriceId: string | null = null;

      // Get the Stripe Price ID based on item type
      if (itemType === 'option') {
        const option = await this.findOptionById(itemId);
        stripePriceId = option.stripePriceId;

        if (!stripePriceId) {
          throw new BadRequestException('Cette option n\'a pas de prix Stripe configuré');
        }
      } else if (itemType === 'pack') {
        const pack = await this.findPackById(itemId);
        stripePriceId = pack.stripePriceId;

        if (!stripePriceId) {
          throw new BadRequestException('Ce pack n\'a pas de prix Stripe configuré');
        }
      } else {
        throw new BadRequestException('Type d\'article invalide. Utilisez "option" ou "pack"');
      }

      // Create checkout session
      const session = await this.stripeService.createCheckoutSession(
        stripePriceId,
        quantity,
        successUrl,
        cancelUrl,
        {
          ...metadata,
          itemType,
          itemId,
        },
      );

      return {
        sessionId: session.id,
        url: session.url || '',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating checkout session: ${errorMessage}`);
      throw error;
    }
  }

  async verifyPayment(sessionId: string): Promise<PaymentStatusResponseDto> {
    try {
      const session = await this.stripeService.getCheckoutSession(sessionId);

      return {
        paid: session.payment_status === 'paid',
        paymentStatus: session.payment_status,
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents to euros
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error verifying payment: ${errorMessage}`);
      throw new NotFoundException('Session de paiement non trouvée');
    }
  }
}