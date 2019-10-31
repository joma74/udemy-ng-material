#!/bin/bash
#
# semantic-release uses stdout for error displayment, so take care
#
# see https://serverfault.com/questions/59262/bash-print-stderr-in-red-color
# release/semantic-release-ev.sh 2> >(while read line; do echo -e "\e[01;31m$line\e[0m" >&2; done)
#

# see https://ops.tips/gists/redirect-all-outputs-of-a-bash-script-to-a-file/
# see https://catonmat.net/ftp/bash-redirections-cheat-sheet.pdf
# copy fd 1(stdout) to 3
exec 3>&1
# copy fd 2(stdout) to 1. all stdout from now on goes to stderr
exec 1>&2

echo "args: $@"

printenv | grep -i release

# this is the error displayment, so use fd 3 
>&3 echo "evaluate version only, ignore expected ✖ EVERIFYRELEASE AggregateError:SemanticReleaseError"

exit -1