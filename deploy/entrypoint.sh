#!/bin/sh
set -e

REGION="${AWS_REGION:-us-east-1}"
SSM_PREFIX="/backend-migration-api"

fetch() {
  aws ssm get-parameter --name "$1" --with-decryption --region "$REGION" \
    --query 'Parameter.Value' --output text 2>/dev/null || true
}

DB_HOST=$(fetch "$SSM_PREFIX/db-host")
DB_PORT=$(fetch "$SSM_PREFIX/db-port")
DB_USER=$(fetch "$SSM_PREFIX/db-user")
DB_PASS=$(fetch "$SSM_PREFIX/db-pass")
DB_NAME=$(fetch "$SSM_PREFIX/db-name")

[ -n "$DB_HOST" ] && export DB_HOST && echo "[entrypoint] DB_HOST loaded"
[ -n "$DB_PORT" ] && export DB_PORT
[ -n "$DB_USER" ] && export DB_USER && echo "[entrypoint] DB_USER=$DB_USER"
[ -n "$DB_PASS" ] && export DB_PASS
[ -n "$DB_NAME" ] && export DB_NAME && echo "[entrypoint] DB_NAME=$DB_NAME"

exec node /app/src/server.js
