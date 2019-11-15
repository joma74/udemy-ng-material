#!/bin/bash

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

. ${DIR}/debug.sh

set -o pipefail

node_modules/.bin/env-cmd -f release/envs/evalnv.js semantic-release --no-ci 2>&1 | tee release/release-evalnv.log

exitcode=$?

echo ">> Script EC(${exitcode})"

exit $exitcode
