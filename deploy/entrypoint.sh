#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-backend-migration-api-service}"
SSM_PREFIX="${SSM_PARAMETER_PREFIX:-/${SERVICE_NAME}}"
AWS_REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-ap-northeast-2}}"
export AWS_REGION AWS_DEFAULT_REGION="${AWS_REGION}"

log() {
  printf '[entrypoint] %s\n' "$*" >&2
}

REQUIRED_KEYS=(
  SECRET_NAME
  AWS_REGION
  DB_HOST
  DB_PORT
  DB_USER
  DB_PASSWORD
  DB_NAME
)

log "loading SSM parameters from ${SSM_PREFIX}/* in ${AWS_REGION}"

NEXT_TOKEN=""
PARAMS_JSON="[]"
while : ; do
  if [ -n "${NEXT_TOKEN}" ]; then
    PAGE=$(aws ssm get-parameters-by-path \
      --path "${SSM_PREFIX}" \
      --recursive \
      --with-decryption \
      --region "${AWS_REGION}" \
      --starting-token "${NEXT_TOKEN}" \
      --output json)
  else
    PAGE=$(aws ssm get-parameters-by-path \
      --path "${SSM_PREFIX}" \
      --recursive \
      --with-decryption \
      --region "${AWS_REGION}" \
      --output json)
  fi

  PARAMS_JSON=$(jq -s '.[0] + .[1]' <(printf '%s' "${PARAMS_JSON}") <(printf '%s' "${PAGE}" | jq '.Parameters'))

  NEXT_TOKEN=$(printf '%s' "${PAGE}" | jq -r '.NextToken // empty')
  if [ -z "${NEXT_TOKEN}" ]; then
    break
  fi
done

COUNT=$(printf '%s' "${PARAMS_JSON}" | jq 'length')
log "fetched ${COUNT} parameter(s) from SSM"

while IFS=$'\t' read -r KEY VALUE; do
  [ -z "${KEY}" ] && continue
  export "${KEY}=${VALUE}"
  log "injected env: ${KEY}"
done < <(printf '%s' "${PARAMS_JSON}" | jq -r --arg prefix "${SSM_PREFIX}/" '.[] | [(.Name | sub($prefix; "")), .Value] | @tsv')

MISSING=()
for KEY in "${REQUIRED_KEYS[@]}"; do
  if [ -z "${!KEY:-}" ]; then
    MISSING+=("${KEY}")
  fi
done

if [ "${#MISSING[@]}" -gt 0 ]; then
  log "missing required env: ${MISSING[*]}"
  exit 1
fi

log "starting: $*"
exec "$@"
