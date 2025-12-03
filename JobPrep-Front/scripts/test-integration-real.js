#!/usr/bin/env node
// =============================================
// FILE: scripts/test-integration-real.js
// =============================================
/**
 * Script pour lancer les tests d'intégration réels avec backend et frontend
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Tests d\'intégration réels avec backend et frontend...\n');

// Configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
const BACKEND_DIR = path.join(__dirname, '..', '..', 'JOBPREP-BACKEND');
const FRONTEND_DIR = path.join(__dirname, '..');

// Fonction pour vérifier si un port est utilisé
function checkPort(port) {
  try {
    execSync(`lsof -ti:${port}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Fonction pour attendre qu'un service soit disponible
async function waitForService(url, timeout = 30000) {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // Service pas encore disponible
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return false;
}

// Fonction pour lancer le backend
async function startBackend() {
  console.log('🔧 Démarrage du backend...');
  
  if (checkPort(3001)) {
    console.log('✅ Backend déjà lancé sur le port 3001');
    return null;
  }

  const backendProcess = spawn('npm', ['run', 'start:dev'], {
    cwd: BACKEND_DIR,
    stdio: 'pipe',
    shell: true
  });

  // Attendre que le backend soit disponible
  console.log('⏳ Attente du backend...');
  const backendReady = await waitForService(`${BACKEND_URL}/health`);
  
  if (!backendReady) {
    console.error('❌ Backend non accessible après 30 secondes');
    backendProcess.kill();
    throw new Error('Backend non accessible');
  }

  console.log('✅ Backend lancé et accessible');
  return backendProcess;
}

// Fonction pour lancer le frontend
async function startFrontend() {
  console.log('🔧 Démarrage du frontend...');
  
  if (checkPort(3000)) {
    console.log('✅ Frontend déjà lancé sur le port 3000');
    return null;
  }

  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: FRONTEND_DIR,
    stdio: 'pipe',
    shell: true
  });

  // Attendre que le frontend soit disponible
  console.log('⏳ Attente du frontend...');
  const frontendReady = await waitForService(FRONTEND_URL);
  
  if (!frontendReady) {
    console.error('❌ Frontend non accessible après 30 secondes');
    frontendProcess.kill();
    throw new Error('Frontend non accessible');
  }

  console.log('✅ Frontend lancé et accessible');
  return frontendProcess;
}

// Fonction pour lancer les tests
async function runTests() {
  console.log('🧪 Lancement des tests d\'intégration réels...');
  
  try {
    execSync('npm test -- lib/hooks/__tests__/integration-real.test.ts', {
      stdio: 'inherit',
      cwd: FRONTEND_DIR
    });
    console.log('✅ Tests d\'intégration réels terminés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des tests:', error.message);
    throw error;
  }
}

// Fonction principale
async function main() {
  let backendProcess = null;
  let frontendProcess = null;

  try {
    // Vérifier que les dossiers existent
    if (!fs.existsSync(BACKEND_DIR)) {
      throw new Error(`Dossier backend non trouvé: ${BACKEND_DIR}`);
    }
    
    if (!fs.existsSync(FRONTEND_DIR)) {
      throw new Error(`Dossier frontend non trouvé: ${FRONTEND_DIR}`);
    }

    // Lancer le backend
    backendProcess = await startBackend();

    // Lancer le frontend
    frontendProcess = await startFrontend();

    // Attendre un peu pour que tout soit prêt
    console.log('⏳ Attente de la stabilisation des services...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Lancer les tests
    await runTests();

    console.log('\n🎉 Tests d\'intégration réels terminés avec succès !');
    console.log('\n📊 Résumé des tests :');
    console.log('   ✅ Flux complet d\'onboarding avec backend réel');
    console.log('   ✅ Persistance localStorage avec backend réel');
    console.log('   ✅ Gestion des erreurs avec backend réel');
    console.log('   ✅ Validation des enums avec backend réel');

  } catch (error) {
    console.error('❌ Erreur lors des tests d\'intégration réels:', error.message);
    process.exit(1);
  } finally {
    // Nettoyer les processus
    if (backendProcess) {
      console.log('🛑 Arrêt du backend...');
      backendProcess.kill();
    }
    
    if (frontendProcess) {
      console.log('🛑 Arrêt du frontend...');
      frontendProcess.kill();
    }
  }
}

// Lancer le script
main().catch(console.error);
