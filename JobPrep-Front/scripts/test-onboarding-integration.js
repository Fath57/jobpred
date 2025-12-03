#!/usr/bin/env node
// =============================================
// FILE: scripts/test-onboarding-integration.js
// =============================================
/**
 * Script pour exécuter les tests d'intégration de l'onboarding
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Exécution des tests d\'intégration pour l\'onboarding...\n');

try {
  // Test 1: Tests d'intégration complets
  console.log('📋 1. Test du flux complet d\'onboarding...');
  execSync('npm test -- lib/hooks/__tests__/useOnboardingForm.integration.test.ts', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Tests du flux complet terminés\n');

  // Test 2: Tests de persistance
  console.log('💾 2. Test de la persistance localStorage...');
  execSync('npm test -- lib/hooks/__tests__/useOnboardingForm.persistence.test.ts', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Tests de persistance terminés\n');

  // Test 3: Tests d'intégration backend
  console.log('🔗 3. Test de l\'intégration backend...');
  execSync('npm test -- lib/hooks/__tests__/useOnboardingForm.backend.test.ts', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Tests d\'intégration backend terminés\n');

  console.log('🎉 Tous les tests d\'intégration sont passés avec succès !');
  console.log('\n📊 Résumé des tests :');
  console.log('   ✅ Flux complet d\'onboarding');
  console.log('   ✅ Persistance localStorage');
  console.log('   ✅ Reprise d\'onboarding');
  console.log('   ✅ Intégration backend');
  console.log('   ✅ Gestion des erreurs');
  console.log('   ✅ Validation des types');

} catch (error) {
  console.error('❌ Erreur lors de l\'exécution des tests :', error.message);
  process.exit(1);
}
