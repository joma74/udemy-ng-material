#!/bin/bash
#
# semantic-release uses stdout for error displayment, so take care
#
# see https://serverfault.com/questions/59262/bash-print-stderr-in-red-color
# release/semantic-release-ev.sh 2> >(while read line; do echo -e "\e[01;31m$line\e[0m" >&2; done)
#

>&2 echo "args: $@"

printenv 1> >(grep -i release >&2)

>&1 echo "evaluate version only, ignore expected ✖ EVERIFYRELEASE AggregateError:SemanticReleaseError"

exit -1