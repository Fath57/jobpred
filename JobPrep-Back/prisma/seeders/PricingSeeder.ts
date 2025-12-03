import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();

// Initialiser Stripe (utilise les variables d'environnement)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Helper pour créer un produit et prix Stripe
async function createStripeProductAndPrice(name: string, description: string, amount: number) {
  try {
    const product = await stripe.products.create({
      name,
      description,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
    });

    console.log(`  ✅ Stripe product created: ${product.id} - ${name}`);
    return {
      stripeProductId: product.id,
      stripePriceId: price.id,
    };
  } catch (error) {
    console.warn(`  ⚠️  Stripe error for ${name}:`, error instanceof Error ? error.message : 'Unknown error');
    return {
      stripeProductId: null,
      stripePriceId: null,
    };
  }
}

export async function seedPricing() {
  console.log('🌱 Seeding pricing data...');

  // Créer les options par défaut avec Stripe
  const optionDataList = [
    {
      name: 'Refonte de CV',
      description: 'Service de refonte complète de votre CV pour le rendre plus attractif',
      amount: 50.0,
      code: 'CV_REDESIGN',
    },
    {
      name: 'Lettre de motivation',
      description: 'Rédaction personnalisée de lettre de motivation',
      amount: 30.0,
      code: 'MOTIVATION_LETTER',
    },
    {
      name: 'Skills tests',
      description: 'Tests d\'évaluation des compétences techniques et soft skills',
      amount: 25.0,
      code: 'SKILLS_TESTS',
    },
    {
      name: 'Communication bundle',
      description: 'Formation complète en communication professionnelle',
      amount: 40.0,
      code: 'COMMUNICATION_BUNDLE',
    },
    {
      name: 'Resume analysis',
      description: 'Analyse détaillée de votre CV avec recommandations',
      amount: 20.0,
      code: 'RESUME_ANALYSIS',
    },
    {
      name: 'Follow up letter',
      description: 'Rédaction de lettre de relance personnalisée',
      amount: 15.0,
      code: 'FOLLOW_UP_LETTER',
    },
  ];

  const options = [];
  
  for (const optionData of optionDataList) {
    // Créer le produit et prix Stripe
    const stripeData = await createStripeProductAndPrice(
      optionData.name,
      optionData.description,
      optionData.amount
    );

    // Créer ou mettre à jour l'option dans la base de données
    const option = await prisma.option.upsert({
      where: { code: optionData.code },
      update: {
        ...stripeData,
      },
      create: {
        ...optionData,
        ...stripeData,
      },
    });

    options.push(option);
  }

  console.log(`✅ Created ${options.length} options with Stripe integration`);

  // Créer les packs par défaut avec Stripe
  const packDataList = [
    {
      name: 'Offre 1 – Basique',
      description: 'Pack de base avec les services essentiels',
      amount: 90.0,
      code: 'BASIC_PACK',
    },
    {
      name: 'Offre 2 – Basique + Communication Bundle',
      description: 'Pack basique avec formation en communication',
      amount: 120.0,
      code: 'BASIC_COMMUNICATION_PACK',
    },
    {
      name: 'Offre 3 – Basique+',
      description: 'Pack complet avec tous les services',
      amount: 150.0,
      code: 'BASIC_PLUS_PACK',
    },
  ];

  const packs = [];

  for (const packData of packDataList) {
    // Créer le produit et prix Stripe
    const stripeData = await createStripeProductAndPrice(
      packData.name,
      packData.description,
      packData.amount
    );

    // Créer ou mettre à jour le pack dans la base de données
    const pack = await prisma.pack.upsert({
      where: { code: packData.code },
      update: {
        ...stripeData,
      },
      create: {
        ...packData,
        ...stripeData,
      },
    });

    packs.push(pack);
  }

  console.log(`✅ Created ${packs.length} packs with Stripe integration`);

  // Associer les options aux packs
  // Pack 1 - Basique
  const pack1 = packs.find(p => p.code === 'BASIC_PACK')!;
  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack1.id,
        optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      },
    },
    update: {},
    create: {
      packId: pack1.id,
      optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack1.id,
        optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      },
    },
    update: {},
    create: {
      packId: pack1.id,
      optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack1.id,
        optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      },
    },
    update: {},
    create: {
      packId: pack1.id,
      optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      quantity: 1,
    },
  });

  // Pack 2 - Basique + Communication
  const pack2 = packs.find(p => p.code === 'BASIC_COMMUNICATION_PACK')!;
  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack2.id,
        optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      },
    },
    update: {},
    create: {
      packId: pack2.id,
      optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack2.id,
        optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      },
    },
    update: {},
    create: {
      packId: pack2.id,
      optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack2.id,
        optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      },
    },
    update: {},
    create: {
      packId: pack2.id,
      optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack2.id,
        optionId: options.find(o => o.code === 'COMMUNICATION_BUNDLE')!.id,
      },
    },
    update: {},
    create: {
      packId: pack2.id,
      optionId: options.find(o => o.code === 'COMMUNICATION_BUNDLE')!.id,
      quantity: 1,
    },
  });

  // Pack 3 - Basique+
  const pack3 = packs.find(p => p.code === 'BASIC_PLUS_PACK')!;
  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'CV_REDESIGN')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'MOTIVATION_LETTER')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'SKILLS_TESTS')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'RESUME_ANALYSIS')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'RESUME_ANALYSIS')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'FOLLOW_UP_LETTER')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'FOLLOW_UP_LETTER')!.id,
      quantity: 1,
    },
  });

  await prisma.packOption.upsert({
    where: {
      packId_optionId: {
        packId: pack3.id,
        optionId: options.find(o => o.code === 'COMMUNICATION_BUNDLE')!.id,
      },
    },
    update: {},
    create: {
      packId: pack3.id,
      optionId: options.find(o => o.code === 'COMMUNICATION_BUNDLE')!.id,
      quantity: 1,
    },
  });

  console.log('✅ Pricing data seeded successfully with Stripe integration!');
}
