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

declare -i exitcode

if [ $1 = "verifyReleaseCmd" ]; then
    # check git status clean
    gitoutput=$(git status --porcelain)
    if [ -n "$gitoutput" ]; then
        exitcode=3
        echo ">> ✖ local git repo is dirty (EC${exitcode})"
        exit $exitcode
    fi
    # write versions
    echo "$2" >target/releaseversion.txt
    echo "$2-SNAPSHOT" >target/nextversion.txt

    printenv | grep -i release

    exitcode=1
    # this is the error displayment, so use fd 3
    echo >&3 ">> ✔ evaluate next version(evalnv) only, ignore expected ✖ EVERIFYRELEASE AggregateError:SemanticReleaseError (EC${exitcode})"

    exit $exitcode
elif [ $1 = "verifyConditionsCmd" ]; then

    printenv | grep -i release

    rm target/*version.txt
    exitcode=0
    echo ">> ✔ cleaned target/*version.txt (EC${exitcode})"
    exit $exitcode
else
    exitcode=99
    echo >&3 ">> ✖ an unknown command was issued (EC${exitcode})"
    exit $exitcode
fi
