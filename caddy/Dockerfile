FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM caddy:latest

WORKDIR /srv

COPY caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/out ./