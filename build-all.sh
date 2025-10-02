#!/bin/bash
set -e  # stop if any command fails

echo "Building main AMBCAT Explorer app..."
vite build

echo "Building Ambivator submodule..."
cd submodules/viv-ambcat/sites/ambivator
pnpm install
pnpm build

echo "Copying Ambivator build output to main dist/ambivator..."
cd ../../../../
rm -rf dist/ambivator
mkdir -p dist/ambivator
cp -r submodules/viv-ambcat/sites/ambivator/dist/* dist/ambivator/

echo "Build completed!"
