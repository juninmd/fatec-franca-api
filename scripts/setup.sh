#!/bin/sh

# script/setup: Set up application for the first time after cloning, or set it
#               back to the initial first unused state.

set -e

cd "$(dirname "$0")/.."

scripts/bootstrap

 echo "==> App is now ready to go!"
