# syntax=docker/dockerfile:1.6
FROM --platform=linux/amd64 node:20-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build || echo "no build step"

FROM --platform=linux/amd64 node:20-bookworm-slim AS runtime

ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    PORT=5012

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip \
        jq \
        tini \
    && curl -sSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip \
    && unzip -q /tmp/awscliv2.zip -d /tmp \
    && /tmp/aws/install \
    && rm -rf /tmp/aws /tmp/awscliv2.zip \
    && apt-get purge -y --auto-remove unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app /app

RUN chmod +x /app/deploy/entrypoint.sh \
    && groupadd --system app \
    && useradd --system --gid app --home /app --shell /usr/sbin/nologin app \
    && chown -R app:app /app

USER app

EXPOSE 5012

ENTRYPOINT ["/usr/bin/tini", "--", "/app/deploy/entrypoint.sh"]
CMD ["node", "dist/index.js"]
