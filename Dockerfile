# syntax=docker/dockerfile:1

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=optional
COPY . .
RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev --omit=optional
COPY --from=builder /app/dist ./dist
# Copy migrations built to dist (already included by above)
COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Defaults; override via compose/env
ENV PORT=3000 \
    DB_HOST=db \
    DB_PORT=5432 \
    DB_USER=postgres \
    DB_PASSWORD=postgres \
    DB_NAME=fourami \
    DB_SSL=false \
    JWT_SECRET=change_me

EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]

