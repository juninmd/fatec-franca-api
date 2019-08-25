#!/bin/sh

# script/setup: Set up application for the first time after cloning, or set it
#               back to the initial first unused state.

set -e

cd "$(dirname "$0")/.."

scripts/bootstrap

echo "===> Setting up DB..."
# reset database to a fresh state.
node_modules/.bin/sequelize db:migrate:undo:all
node_modules/.bin/sequelize db:migrate

# Seed database
node_modules/.bin/sequelize db:seed:all

echo "==> App is now ready to go!"
