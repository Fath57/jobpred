#!/bin/bash

echo "🚀 Starting JobPrep Backend with Pricing API..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"

# Start the application in background
echo "🌐 Starting server on port 3050..."
npm run start:dev &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 10

# Check if server is running
if curl -s http://localhost:3050 > /dev/null; then
    echo "✅ Server is running!"

    # Run the pricing API test
    echo "🧪 Running Pricing API tests..."
    node test-pricing-api.js

    # Stop the server
    echo "🛑 Stopping server..."
    kill $SERVER_PID

    echo "✅ Test completed!"
else
    echo "❌ Server failed to start. Check the logs above."
    kill $SERVER_PID 2>/dev/null
    exit 1
fi
