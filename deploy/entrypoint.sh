#!/bin/sh
set -e

REGION="${AWS_REGION:-us-east-1}"
SSM_PREFIX="/backend-migration-api"

fetch() {
  aws ssm get-parameter --name "$1" --with-decryption --region "$REGION" \
    --query 'Parameter.Value' --output text 2>/dev/null || true
}

DB_URL=$(fetch "$SSM_PREFIX/database-url")
[ -n "$DB_URL" ] && export DATABASE_URL="$DB_URL" && echo "[entrypoint] DATABASE_URL loaded from SSM"

exec node /app/src/server.js
