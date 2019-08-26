#!/bin/sh

# script/server: Launch the application and any extra required processes
#                locally.

set -e

cd "$(dirname "$0")/.."

test -z "$NODE_ENV" &&
  NODE_ENV='development'

# boot the app and any other necessary processes.
node dist/index.js
