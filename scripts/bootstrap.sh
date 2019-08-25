#!/bin/sh

# script/bootstrap: Resolve all dependencies that the application requires to
#                   run.

set -e

if [ -f "package.json" ]; then
  if [ ! -d "node_modules" ]; then
    echo "==> Installing module dependencies…"
    npm install
  fi
fi
