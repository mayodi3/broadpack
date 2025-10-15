#!/bin/bash

# Exit on error
set -e

# Run build
echo "🔨 Skipping build..."
pnpm build

# Add changes
echo "📦 Adding changes to git..."
git add .

# Ask for commit message
read -p "📝 Enter commit message: " commit_message

# Commit with message
git commit -m "$commit_message"

# Push to main branch
echo "🚀 Pushing to origin main..."
git push -u origin main

echo "✅ All done!"