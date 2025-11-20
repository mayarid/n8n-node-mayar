#!/usr/bin/env bash
set -euo pipefail

BUMP=${1:-}
PUBLISH=${2:-}

if [[ "$BUMP" != "major" && "$BUMP" != "minor" && "$BUMP" != "patch" ]]; then
  echo "Usage: ./bump.sh [major|minor|patch] [publish]"
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree not clean"
  exit 1
fi

npm run build
npm version "$BUMP" -m "chore(release): v%s"
git push
git push --tags

if [[ "$PUBLISH" == "publish" ]]; then
  npm publish --access public
fi