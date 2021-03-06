#!/bin/sh

# script/test: Run test suite for application. Optionally pass in a path to an
#              individual test file to run a single test.


set -e

cd "$(dirname "$0")/.."

[ -z "$DEBUG" ] || set -x

export NODE_ENV="test"
./node_modules/.bin/tsc
node_modules/.bin/jest --detectOpenHandles --forceExit --runInBand