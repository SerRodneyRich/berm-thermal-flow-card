#!/bin/bash

# Berm Thermal Flow Card - Release Script
# This script automates creating a new release for HACS compliance

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get version from package.json or use argument
if [ -n "$1" ]; then
  VERSION="$1"
else
  VERSION=$(node -p "require('./package.json').version")
fi

TAG="v${VERSION}"

echo -e "${GREEN}Berm Thermal Flow Card Release Script${NC}"
echo "======================================"
echo ""
echo "Creating release: ${TAG}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found. Run this script from the repository root.${NC}"
  exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}Warning: You have uncommitted changes.${NC}"
  read -p "Do you want to commit them now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "Release ${TAG}"
  else
    echo -e "${RED}Aborting. Please commit your changes first.${NC}"
    exit 1
  fi
fi

# Build the project
echo -e "${GREEN}Building project...${NC}"
npm run build

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo -e "${YELLOW}Warning: Tag ${TAG} already exists.${NC}"
  read -p "Do you want to delete and recreate it? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git tag -d "$TAG"
    git push origin ":refs/tags/${TAG}" 2>/dev/null || true
  else
    echo -e "${RED}Aborting.${NC}"
    exit 1
  fi
fi

# Create git tag
echo -e "${GREEN}Creating git tag ${TAG}...${NC}"
git tag -a "$TAG" -m "Release ${TAG}"

# Push changes
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push origin master
git push origin "$TAG"

echo ""
echo -e "${GREEN}✓ Tag created and pushed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Go to: https://github.com/SerRodneyRich/berm-thermal-flow-card/releases/new"
echo "2. Select tag: ${TAG}"
echo "3. Set title: ${TAG} - Berm Thermal Flow Card"
echo "4. Add release notes from CHANGELOG.md"
echo "5. Attach berm-thermal-flow-card.js (optional)"
echo "6. Click 'Publish release'"
echo ""
echo "Or use GitHub CLI:"
echo "  gh release create ${TAG} --title \"${TAG}\" --notes-file CHANGELOG.md berm-thermal-flow-card.js"
echo ""
echo -e "${GREEN}After creating the release, HACS will be able to install the card!${NC}"
