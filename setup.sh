#!/bin/bash

# ANS Academy Setup Script
echo "🚀 Setting up ANS Academy..."

# Install dependencies
npm install

# Install additional UI components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label textarea avatar badge progress tabs select checkbox

# Set up database
npx prisma generate
npx prisma db push

# Create directories
mkdir -p public/images
mkdir -p public/sounds
mkdir -p public/pyq

# Set up environment variables
cp .env.example .env.local

echo "✅ Setup complete! Please:"
echo "1. Update .env.local with your database URL"
echo "2. Run 'npm run dev:full' to start both frontend and backend"
echo "3. Visit http://localhost:3000"