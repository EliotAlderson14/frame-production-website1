#!/usr/bin/env bash
set -euo pipefail
npm run build --prefix frontend
mkdir -p dist/.openai
cp .openai/hosting.json dist/.openai/hosting.json

# Serve the React Router pages on direct visits as well as client navigation.
for route in work about services contact; do
  mkdir -p "dist/$route"
  cp dist/index.html "dist/$route/index.html"
done
for slug in alex-topuria-edit mate-motors socar zooplus brunch-and-dine; do
  mkdir -p "dist/work/$slug"
  cp dist/index.html "dist/work/$slug/index.html"
done
