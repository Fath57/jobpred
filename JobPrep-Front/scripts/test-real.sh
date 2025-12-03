#!/bin/bash
# =============================================
# FILE: scripts/test-real.sh
# =============================================
# Script pour lancer les tests d'intégration réels

echo "🚀 Tests d'intégration réels avec backend et frontend"
echo "=================================================="

# Configuration
BACKEND_DIR="/home/pc-user/Documents/JOBPREP-BACKEND"
FRONTEND_DIR="/home/pc-user/Documents/JobPrep-Front"
BACKEND_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"

# Fonction pour vérifier si un port est utilisé
check_port() {
    if lsof -ti:$1 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Fonction pour attendre qu'un service soit disponible
wait_for_service() {
    local url=$1
    local timeout=${2:-30}
    local count=0
    
    echo "⏳ Attente de $url..."
    
    while [ $count -lt $timeout ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ $url accessible"
            return 0
        fi
        
        sleep 1
        count=$((count + 1))
    done
    
    echo "❌ $url non accessible après ${timeout}s"
    return 1
}

# Fonction pour lancer le backend
start_backend() {
    echo "🔧 Démarrage du backend..."
    
    if check_port 3001; then
        echo "✅ Backend déjà lancé sur le port 3001"
        return 0
    fi
    
    cd "$BACKEND_DIR"
    npm run start:dev &
    BACKEND_PID=$!
    
    if wait_for_service "$BACKEND_URL/health" 30; then
        echo "✅ Backend lancé et accessible (PID: $BACKEND_PID)"
        return 0
    else
        echo "❌ Échec du démarrage du backend"
        kill $BACKEND_PID 2>/dev/null
        return 1
    fi
}

# Fonction pour lancer le frontend
start_frontend() {
    echo "🔧 Démarrage du frontend..."
    
    if check_port 3000; then
        echo "✅ Frontend déjà lancé sur le port 3000"
        return 0
    fi
    
    cd "$FRONTEND_DIR"
    npm run dev &
    FRONTEND_PID=$!
    
    if wait_for_service "$FRONTEND_URL" 30; then
        echo "✅ Frontend lancé et accessible (PID: $FRONTEND_PID)"
        return 0
    else
        echo "❌ Échec du démarrage du frontend"
        kill $FRONTEND_PID 2>/dev/null
        return 1
    fi
}

# Fonction pour lancer les tests
run_tests() {
    echo "🧪 Lancement des tests d'intégration réels..."
    
    cd "$FRONTEND_DIR"
    
    if npm test -- lib/hooks/__tests__/integration-real.test.ts; then
        echo "✅ Tests d'intégration réels terminés avec succès"
        return 0
    else
        echo "❌ Échec des tests d'intégration réels"
        return 1
    fi
}

# Fonction de nettoyage
cleanup() {
    echo "🛑 Nettoyage des processus..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend arrêté"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend arrêté"
    fi
}

# Gestion des signaux pour le nettoyage
trap cleanup EXIT INT TERM

# Fonction principale
main() {
    echo "📋 Vérification des prérequis..."
    
    # Vérifier que les dossiers existent
    if [ ! -d "$BACKEND_DIR" ]; then
        echo "❌ Dossier backend non trouvé: $BACKEND_DIR"
        exit 1
    fi
    
    if [ ! -d "$FRONTEND_DIR" ]; then
        echo "❌ Dossier frontend non trouvé: $FRONTEND_DIR"
        exit 1
    fi
    
    echo "✅ Prérequis vérifiés"
    
    # Lancer le backend
    if ! start_backend; then
        echo "❌ Impossible de lancer le backend"
        exit 1
    fi
    
    # Lancer le frontend
    if ! start_frontend; then
        echo "❌ Impossible de lancer le frontend"
        exit 1
    fi
    
    # Attendre un peu pour que tout soit prêt
    echo "⏳ Attente de la stabilisation des services..."
    sleep 5
    
    # Lancer les tests
    if run_tests; then
        echo ""
        echo "🎉 Tests d'intégration réels terminés avec succès !"
        echo ""
        echo "📊 Résumé des tests :"
        echo "   ✅ Flux complet d'onboarding avec backend réel"
        echo "   ✅ Persistance localStorage avec backend réel"
        echo "   ✅ Gestion des erreurs avec backend réel"
        echo "   ✅ Validation des enums avec backend réel"
        echo ""
        echo "🚀 L'intégration est prête pour la production !"
    else
        echo "❌ Échec des tests d'intégration réels"
        exit 1
    fi
}

# Lancer le script
main "$@"
