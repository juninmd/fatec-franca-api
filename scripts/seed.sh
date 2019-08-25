#!/bin/sh

# script/db:seed:all: Execute the migration script to seed database

set -e

echo "===> Seeding db "$1" DB..."
node_modules/.bin/sequelize db:seed:undo:all
node_modules/.bin/sequelize db:seed:all

echo "==> App is now ready to go!"
