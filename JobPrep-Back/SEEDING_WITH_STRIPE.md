# Seeding avec Stripe

## Vue d'ensemble

Le seeder de pricing a été mis à jour pour créer automatiquement les produits et prix Stripe lors du seeding de la base de données.

## Configuration requise

### Variables d'environnement

Avant d'exécuter le seeder, assurez-vous d'avoir configuré votre clé Stripe dans le fichier `.env` :

```env
STRIPE_SECRET_KEY="sk_test_votre_clé_stripe"
```

> **⚠️ Important** : Sans cette clé, le seeder créera quand même les données locales mais **sans les intégrations Stripe** (les champs `stripeProductId` et `stripePriceId` seront `null`).

## Exécution du seeder

### Méthode 1 : Seed complet

```bash
yarn db:seed
# ou
npm run db:seed
```

Cette commande :
1. Crée les options dans la base de données locale
2. **Crée automatiquement les produits Stripe** pour chaque option
3. **Crée automatiquement les prix Stripe** pour chaque option
4. Sauvegarde les IDs Stripe dans la base de données
5. Fait la même chose pour les packs

### Méthode 2 : Reset et seed

```bash
yarn db:reset
# ou
npm run db:reset
```

Cette commande reset complètement la base de données et réexécute toutes les migrations et seeders.

## Que fait le seeder ?

### Pour les Options

Le seeder crée 6 options par défaut :

1. **Refonte de CV** - 50€
2. **Lettre de motivation** - 30€
3. **Skills tests** - 25€
4. **Communication bundle** - 40€
5. **Resume analysis** - 20€
6. **Follow up letter** - 15€

Pour chaque option, il :
- Crée un **Product Stripe** avec le nom et la description
- Crée un **Price Stripe** (one-time payment en EUR)
- Sauvegarde les IDs retournés par Stripe

### Pour les Packs

Le seeder crée 3 packs par défaut :

1. **Offre 1 – Basique** - 90€
   - Refonte de CV
   - Lettre de motivation
   - Skills tests

2. **Offre 2 – Basique + Communication Bundle** - 120€
   - Tout le Pack Basique
   - Communication bundle

3. **Offre 3 – Basique+** - 150€
   - Tout le Pack Basique+
   - Resume analysis
   - Follow up letter

Pour chaque pack, le même processus est appliqué.

## Logs du seeder

Le seeder affiche des logs détaillés :

```
🌱 Seeding pricing data...
  ✅ Stripe product created: prod_xxxxx - Refonte de CV
  ✅ Stripe product created: prod_xxxxx - Lettre de motivation
  ...
✅ Created 6 options with Stripe integration
  ✅ Stripe product created: prod_xxxxx - Offre 1 – Basique
  ...
✅ Created 3 packs with Stripe integration
✅ Pricing data seeded successfully with Stripe integration!
```

## Gestion des erreurs

Si Stripe renvoie une erreur (clé invalide, limite de taux, etc.), le seeder :
1. Affiche un avertissement : `⚠️ Stripe error for [nom]: [message]`
2. Continue avec `stripeProductId` et `stripePriceId` à `null`
3. Les données locales sont quand même créées

Cela permet de :
- Tester l'application sans Stripe
- Continuer le développement même si Stripe est temporairement indisponible
- Ajouter manuellement les IDs Stripe plus tard via l'API

## Vérification dans l'admin

Une fois le seeder exécuté, vous pouvez vérifier les IDs Stripe dans l'interface admin :

### Liste des Options
- Les colonnes "Stripe Product" et "Stripe Price" affichent les IDs
- Les IDs sont affichés en format `code` tronqué
- Hover sur l'ID pour voir la valeur complète

### Détails du Pack
- Section "Intégration Stripe" en bas des détails
- Affiche le Product ID et Price ID complets
- Format code pour copier facilement

## Mode Test vs Production

### Mode Test (Développement)
```env
STRIPE_SECRET_KEY="sk_test_..."
```
- Les produits sont créés dans l'environnement Stripe **Test**
- Les IDs commencent par `prod_test_...` et `price_test_...`
- Aucun vrai paiement n'est traité

### Mode Production
```env
STRIPE_SECRET_KEY="sk_live_..."
```
- Les produits sont créés dans l'environnement Stripe **Live**
- Les IDs commencent par `prod_...` et `price_...`
- ⚠️ **Attention** : Les paiements seront réels !

## Re-seeder avec Stripe existant

Si vous re-exécutez le seeder avec des produits Stripe déjà créés :

1. **Comportement actuel** : Crée de nouveaux produits Stripe à chaque fois
2. **Résultat** : Vous aurez des doublons dans Stripe

### Solution recommandée

Avant de re-seeder en production :
1. Supprimez manuellement les anciens produits dans Stripe Dashboard
2. Ou utilisez `update: {}` dans le seeder pour garder les IDs existants

## Dépannage

### Erreur : "STRIPE_SECRET_KEY not configured"
- Vérifiez que la variable existe dans `.env`
- Redémarrez le serveur après modification

### Erreur : "Invalid API Key"
- Vérifiez que la clé commence par `sk_test_` ou `sk_live_`
- La clé doit être valide et active dans votre compte Stripe

### Les IDs Stripe sont `null`
- Vérifiez les logs du seeder pour voir les erreurs Stripe
- Assurez-vous que votre clé Stripe a les permissions nécessaires
- Vérifiez votre connexion Internet

## Commandes utiles

```bash
# Voir les produits Stripe via CLI
stripe products list

# Voir les prix Stripe via CLI
stripe prices list

# Supprimer un produit Stripe
stripe products delete prod_xxxxx

# Reset complet (base de données + Stripe manuel)
yarn db:reset
# Puis supprimer manuellement dans Stripe Dashboard
```

## Prochaines améliorations possibles

1. **Idempotence** : Vérifier si le produit existe avant de créer
2. **Synchronisation bidirectionnelle** : Importer les produits existants depuis Stripe
3. **Cleanup automatique** : Supprimer les produits Stripe lors du reset
4. **Webhooks** : Écouter les changements Stripe et mettre à jour la DB locale

