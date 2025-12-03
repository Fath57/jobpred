# Pricing API Documentation

## Vue d'ensemble

Le module Pricing gère les options et les packs de services pour la plateforme JobPrep. Il permet de créer, modifier et gérer les offres commerciales.

## Modèles de données

### Option
- `id`: Identifiant unique
- `name`: Nom de l'option
- `description`: Description détaillée
- `amount`: Prix de l'option
- `code`: Code unique de l'option
- `isActive`: Statut d'activation

### Pack
- `id`: Identifiant unique
- `name`: Nom du pack
- `description`: Description détaillée
- `amount`: Prix du pack
- `code`: Code unique du pack
- `isActive`: Statut d'activation
- `packOptions`: Options incluses dans le pack

### PackOption (Relation)
- `packId`: ID du pack
- `optionId`: ID de l'option
- `quantity`: Quantité de l'option dans le pack

## Endpoints

### Options

#### GET /pricing/options
Récupère toutes les options actives.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "name": "Refonte de CV",
    "description": "Service de refonte complète de votre CV",
    "amount": 50.0,
    "code": "CV_REDESIGN",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /pricing/options/:id
Récupère une option par son ID.

#### POST /pricing/options
Crée une nouvelle option.

**Body:**
```json
{
  "name": "Nouvelle option",
  "description": "Description de l'option",
  "amount": 25.0,
  "code": "NEW_OPTION"
}
```

#### PATCH /pricing/options/:id
Met à jour une option existante.

#### DELETE /pricing/options/:id
Désactive une option (soft delete).

### Packs

#### GET /pricing/packs
Récupère tous les packs actifs avec leurs options.

**Réponse:**
```json
[
  {
    "id": "uuid",
    "name": "Offre 1 – Basique",
    "description": "Pack de base avec les services essentiels",
    "amount": 90.0,
    "code": "BASIC_PACK",
    "isActive": true,
    "packOptions": [
      {
        "id": "uuid",
        "packId": "uuid",
        "optionId": "uuid",
        "quantity": 1,
        "option": {
          "id": "uuid",
          "name": "Refonte de CV",
          "description": "Service de refonte complète de votre CV",
          "amount": 50.0,
          "code": "CV_REDESIGN"
        }
      }
    ]
  }
]
```

#### GET /pricing/packs/:id
Récupère un pack par son ID avec ses options.

#### POST /pricing/packs
Crée un nouveau pack.

**Body:**
```json
{
  "name": "Nouveau pack",
  "description": "Description du pack",
  "amount": 100.0,
  "code": "NEW_PACK",
  "options": [
    {
      "optionId": "uuid",
      "quantity": 1
    }
  ]
}
```

#### PATCH /pricing/packs/:id
Met à jour un pack existant.

#### DELETE /pricing/packs/:id
Désactive un pack (soft delete).

### Gestion des options dans les packs

#### GET /pricing/packs/:id/options
Récupère les options d'un pack spécifique.

#### POST /pricing/packs/:packId/options/:optionId
Ajoute une option à un pack.

**Body:**
```json
{
  "quantity": 1
}
```

#### DELETE /pricing/packs/:packId/options/:optionId
Retire une option d'un pack.

## Options par défaut

Le système inclut les options suivantes par défaut :

1. **Refonte de CV** (CV_REDESIGN) - 50€
2. **Lettre de motivation** (MOTIVATION_LETTER) - 30€
3. **Skills tests** (SKILLS_TESTS) - 25€
4. **Communication bundle** (COMMUNICATION_BUNDLE) - 40€
5. **Resume analysis** (RESUME_ANALYSIS) - 20€
6. **Follow up letter** (FOLLOW_UP_LETTER) - 15€

## Packs par défaut

### Offre 1 – Basique (90€)
- Refonte de CV
- Lettre de motivation
- Skills tests

### Offre 2 – Basique + Communication Bundle (120€)
- Tout le contenu de l'offre Basique
- Communication bundle

### Offre 3 – Basique+ (150€)
- Tout le contenu de l'offre Basique
- Resume analysis
- Follow up letter
- Communication bundle

## Codes d'erreur

- `400`: Données invalides
- `404`: Ressource non trouvée
- `409`: Conflit (code déjà existant)

## Exemples d'utilisation

### Créer un pack personnalisé
```bash
curl -X POST http://localhost:3001/pricing/packs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pack Premium",
    "description": "Pack complet avec tous les services",
    "amount": 200.0,
    "code": "PREMIUM_PACK",
    "options": [
      {"optionId": "cv-redesign-id", "quantity": 1},
      {"optionId": "communication-bundle-id", "quantity": 2}
    ]
  }'
```

### Ajouter une option à un pack existant
```bash
curl -X POST http://localhost:3001/pricing/packs/pack-id/options/option-id \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

## Intégration Stripe

Le module Pricing est maintenant intégré avec Stripe pour gérer les paiements.

### Modèles de données avec Stripe

Chaque **Option** et **Pack** contient maintenant :
- `stripeProductId`: ID du produit Stripe
- `stripePriceId`: ID du prix Stripe (paiement unique en EUR)

### Création automatique dans Stripe

Lorsque vous créez une option ou un pack via l'API, le système :
1. Crée automatiquement un **Product** dans Stripe
2. Crée automatiquement un **Price** associé (one-time payment, EUR)
3. Sauvegarde les IDs Stripe dans la base de données

### Endpoints de Checkout

#### POST /pricing/checkout/create-session
Crée une session de paiement Stripe.

**Body:**
```json
{
  "itemType": "option",  // ou "pack"
  "itemId": "uuid-de-l-option-ou-pack",
  "quantity": 1,
  "successUrl": "https://votre-site.com/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://votre-site.com/cancel",
  "metadata": {
    "userId": "user-123",
    "customField": "valeur"
  }
}
```

**Réponse:**
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

**Exemple:**
```bash
curl -X POST http://localhost:3001/pricing/checkout/create-session \
  -H "Content-Type: application/json" \
  -d '{
    "itemType": "option",
    "itemId": "option-uuid-here",
    "quantity": 1,
    "successUrl": "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    "cancelUrl": "http://localhost:3000/cancel"
  }'
```

#### POST /pricing/checkout/verify-payment
Vérifie le statut d'un paiement.

**Body:**
```json
{
  "sessionId": "cs_test_xxxxx"
}
```

**Réponse:**
```json
{
  "paid": true,
  "paymentStatus": "paid",
  "sessionId": "cs_test_xxxxx",
  "customerEmail": "client@example.com",
  "amountTotal": 50.00
}
```

**Exemple:**
```bash
curl -X POST http://localhost:3001/pricing/checkout/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "cs_test_xxxxx"
  }'
```

### Webhooks Stripe

Les webhooks Stripe sont gérés automatiquement à l'endpoint :
```
POST /webhooks/stripe
```

**Événements gérés :**
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

**Configuration :**
Voir le fichier `STRIPE_SETUP.md` à la racine du projet pour la configuration complète.

### Variables d'environnement

Ajoutez ces variables à votre `.env` :
```env
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_secret"
```

### Exemple d'utilisation Frontend

```typescript
// Créer une session de checkout
const createCheckout = async (optionId: string) => {
  const response = await fetch('/pricing/checkout/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemType: 'option',
      itemId: optionId,
      quantity: 1,
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  });

  const { url } = await response.json();
  window.location.href = url; // Redirection vers Stripe Checkout
};

// Vérifier le paiement après redirection
const verifyPayment = async (sessionId: string) => {
  const response = await fetch('/pricing/checkout/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });

  const paymentStatus = await response.json();
  if (paymentStatus.paid) {
    console.log('Paiement confirmé !');
  }
};
```

### Cartes de test Stripe

En mode test, utilisez ces cartes :
- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0027 6000 3184`

Pour plus de détails sur la configuration Stripe, consultez le fichier `STRIPE_SETUP.md`.
