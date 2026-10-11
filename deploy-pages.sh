#!/usr/bin/env bash
# Bouwt de statische export en pusht ./out naar de gh-pages branch.
set -euo pipefail
cd "$(dirname "$0")"

npm run build
touch out/.nojekyll

REMOTE=$(git remote get-url origin)
TMP=$(mktemp -d)
cp -R out/. "$TMP"
cd "$TMP"
git init -q
git checkout -q -b gh-pages
git add -A
git commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -qf "$REMOTE" gh-pages
cd - >/dev/null
rm -rf "$TMP"
echo "Gedeployed naar gh-pages."
