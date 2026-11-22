#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npx firebase-tools deploy --project app-conexao-783a4 --only firestore:rules,firestore:indexes
