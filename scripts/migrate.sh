#!/bin/sh

# script/migration: Execute the migration script to update or downgrade database.

set -e

echo "===> Migrating "$1" DB..."
node_modules/.bin/sequelize db:migrate

echo "==> App is now ready to go!"
