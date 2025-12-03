# Configuration Stripe pour JobPrep

## Variables d'environnement requises

Ajoutez ces variables à votre fichier `.env` :

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

## Où trouver ces clés ?

### 1. STRIPE_SECRET_KEY et STRIPE_PUBLISHABLE_KEY

1. Connectez-vous à votre compte Stripe : https://dashboard.stripe.com/
2. Allez dans **Developers** > **API keys**
3. Copiez la **Secret key** (commence par `sk_test_` en mode test ou `sk_live_` en production)
4. Copiez la **Publishable key** (commence par `pk_test_` en mode test ou `pk_live_` en production)

### 2. STRIPE_WEBHOOK_SECRET

1. Allez dans **Developers** > **Webhooks**
2. Cliquez sur **Add endpoint**
3. Entrez l'URL de votre webhook : `https://votre-domaine.com/webhooks/stripe`
   - En local : `http://localhost:3001/webhooks/stripe`
4. Sélectionnez les événements à écouter :
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Cliquez sur **Add endpoint**
6. Copiez le **Signing secret** (commence par `whsec_`)

## Test en local avec Stripe CLI

Pour tester les webhooks en local, utilisez le Stripe CLI :

```bash
# Installation (macOS)
brew install stripe/stripe-cli/stripe

# Installation (Linux)
wget https://github.com/stripe/stripe-cli/releases/download/v1.18.0/stripe_1.18.0_linux_x86_64.tar.gz
tar -xvf stripe_1.18.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/webhooks/stripe

# Le CLI vous donnera un webhook secret temporaire à utiliser dans .env
# Exemple: whsec_xxxxxxxxxxxxxxxxxxxxx
```

## Installation

```bash
# Installer les dépendances
npm install
# ou
yarn install

# Générer le client Prisma avec les nouveaux champs
npm run db:generate
# ou
yarn db:generate

# Créer et appliquer la migration
npx prisma migrate dev --name add_stripe_fields
```

## Comment ça fonctionne ?

### 1. Création automatique des produits Stripe

Quand vous créez une **Option** ou un **Pack** via l'API :
- Un **Product** est automatiquement créé dans Stripe
- Un **Price** est automatiquement créé et lié au produit
- Les IDs Stripe sont sauvegardés dans la base de données

### 2. Mise à jour synchronisée

Quand vous modifiez une option/pack :
- Le nom/description est mis à jour dans Stripe
- Si le prix change, un nouveau Price est créé (les prix Stripe sont immuables)

### 3. Archivage

Quand vous supprimez (soft delete) une option/pack :
- Le produit Stripe est archivé (mis en inactif)

### 4. Checkout

Pour créer une session de paiement :

```bash
POST /pricing/checkout/create-session
{
  "itemType": "option",  // ou "pack"
  "itemId": "uuid-de-l-option-ou-pack",
  "quantity": 1,
  "successUrl": "https://votre-site.com/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://votre-site.com/cancel",
  "metadata": {
    "userId": "user-123",
    "orderId": "order-456"
  }
}
```

Réponse :
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

### 5. Vérifier un paiement

```bash
POST /pricing/checkout/verify-payment
{
  "sessionId": "cs_test_xxxxx"
}
```

Réponse :
```json
{
  "paid": true,
  "paymentStatus": "paid",
  "sessionId": "cs_test_xxxxx",
  "customerEmail": "client@example.com",
  "amountTotal": 50.00
}
```

### 6. Webhooks

Les webhooks Stripe sont automatiquement traités par l'endpoint :
```
POST /webhooks/stripe
```

Les événements suivants sont gérés :
- `checkout.session.completed` : Paiement complété avec succès
- `checkout.session.async_payment_succeeded` : Paiement asynchrone réussi
- `checkout.session.async_payment_failed` : Paiement asynchrone échoué
- `payment_intent.succeeded` : Intention de paiement réussie
- `payment_intent.payment_failed` : Intention de paiement échouée

**Important** : Pour ajouter votre logique métier (créer une commande, envoyer un email, etc.), 
modifiez les méthodes dans `src/pricing/pricing-webhook.controller.ts`.

## Frontend Integration

### 1. Créer une session de checkout

```typescript
// Frontend (React/Next.js example)
const handleCheckout = async (itemType: 'option' | 'pack', itemId: string) => {
  const response = await fetch('http://localhost:3001/pricing/checkout/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemType,
      itemId,
      quantity: 1,
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/cancel`,
      metadata: {
        userId: currentUser.id,
      }
    })
  });

  const { url } = await response.json();
  
  // Rediriger vers Stripe Checkout
  window.location.href = url;
};
```

### 2. Page de succès

```typescript
// pages/success.tsx
const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Vérifier le paiement
      fetch('http://localhost:3001/pricing/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.paid) {
            // Paiement confirmé !
            console.log('Paiement réussi', data);
          }
        });
    }
  }, [sessionId]);

  return <div>Merci pour votre achat !</div>;
};
```

## Mode Test vs Production

### Mode Test (Développement)
- Utilisez les clés commençant par `sk_test_` et `pk_test_`
- Utilisez les cartes de test Stripe :
  - Succès : `4242 4242 4242 4242`
  - Échec : `4000 0000 0000 0002`
  - 3D Secure : `4000 0027 6000 3184`

### Mode Production
- Remplacez les clés de test par les clés de production (`sk_live_`, `pk_live_`)
- Configurez le webhook en production avec votre vraie URL
- Activez votre compte Stripe (vérification d'identité requise)

## Sécurité

⚠️ **Important** :
- Ne commitez JAMAIS vos clés Stripe dans Git
- Utilisez des variables d'environnement
- Le `.env` doit être dans `.gitignore`
- En production, utilisez un gestionnaire de secrets (AWS Secrets Manager, etc.)

## Support

- Documentation Stripe : https://stripe.com/docs
- API Reference : https://stripe.com/docs/api
- Webhooks Guide : https://stripe.com/docs/webhooks

