import { Test, TestingModule } from '@nestjs/testing';
import { PricingService } from './pricing.service';
import { PrismaService } from '../shared/prisma/prisma.service';
import { StripeService } from '../shared/stripe/stripe.service';

describe('PricingService', () => {
  let service: PricingService;
  let prismaService: PrismaService;
  let stripeService: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingService,
        {
          provide: PrismaService,
          useValue: {
            option: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            pack: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            packOption: {
              createMany: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
              upsert: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: StripeService,
          useValue: {
            createProduct: jest.fn().mockResolvedValue({ id: 'prod_test123' }),
            createPrice: jest.fn().mockResolvedValue({ id: 'price_test123' }),
            updateProduct: jest.fn(),
            updatePrice: jest.fn(),
            archiveProduct: jest.fn(),
            createCheckoutSession: jest.fn(),
            getCheckoutSession: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PricingService>(PricingService);
    prismaService = module.get<PrismaService>(PrismaService);
    stripeService = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOption', () => {
    it('should create a new option', async () => {
      const createOptionDto = {
        name: 'Test Option',
        description: 'Test Description',
        amount: 25.0,
        code: 'TEST_OPTION',
      };

      const expectedOption = {
        id: 'test-id',
        ...createOptionDto,
        isActive: true,
        stripeProductId: 'prod_test123',
        stripePriceId: 'price_test123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.option, 'create').mockResolvedValue(expectedOption);

      const result = await service.createOption(createOptionDto);

      expect(result).toEqual(expectedOption);
      expect(stripeService.createProduct).toHaveBeenCalledWith(
        createOptionDto.name,
        createOptionDto.description,
      );
      expect(stripeService.createPrice).toHaveBeenCalledWith('prod_test123', createOptionDto.amount);
      expect(prismaService.option.create).toHaveBeenCalledWith({
        data: {
          ...createOptionDto,
          stripeProductId: 'prod_test123',
          stripePriceId: 'price_test123',
        },
      });
    });
  });

  describe('createPack', () => {
    it('should create a new pack with options', async () => {
      const createPackDto = {
        name: 'Test Pack',
        description: 'Test Pack Description',
        amount: 100.0,
        code: 'TEST_PACK',
        options: [
          { optionId: 'option-1', quantity: 1 },
          { optionId: 'option-2', quantity: 2 },
        ],
      };

      const expectedPack = {
        id: 'test-pack-id',
        name: createPackDto.name,
        description: createPackDto.description,
        amount: createPackDto.amount,
        code: createPackDto.code,
        isActive: true,
        stripeProductId: 'prod_pack_test123',
        stripePriceId: 'price_pack_test123',
        createdAt: new Date(),
        updatedAt: new Date(),
        packOptions: [],
      };

      jest.spyOn(prismaService.pack, 'create').mockResolvedValue(expectedPack);
      jest.spyOn(prismaService.packOption, 'createMany').mockResolvedValue({ count: 2 });
      jest.spyOn(service, 'findPackById').mockResolvedValue(expectedPack);

      const result = await service.createPack(createPackDto);

      expect(result).toEqual(expectedPack);
      expect(stripeService.createProduct).toHaveBeenCalledWith(
        createPackDto.name,
        createPackDto.description,
      );
      expect(stripeService.createPrice).toHaveBeenCalledWith('prod_test123', createPackDto.amount);
      expect(prismaService.pack.create).toHaveBeenCalledWith({
        data: {
          name: createPackDto.name,
          description: createPackDto.description,
          amount: createPackDto.amount,
          code: createPackDto.code,
          stripeProductId: 'prod_test123',
          stripePriceId: 'price_test123',
        },
      });
      expect(prismaService.packOption.createMany).toHaveBeenCalledWith({
        data: createPackDto.options.map(option => ({
          packId: expectedPack.id,
          optionId: option.optionId,
          quantity: option.quantity,
        })),
      });
    });
  });
});

