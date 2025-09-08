#!/bin/sh
set -e

echo "Waiting for Postgres at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Running migrations..."
node ./node_modules/typeorm/cli.js -d dist/database/data-source.js migration:run || true

echo "Starting app on port $PORT"
node dist/main.js

