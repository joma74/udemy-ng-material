#!/bin/bash

CONVDIR="${BASH_SOURCE%/*}"
if [[ ! -d "$CONVDIR" ]]; then CONVDIR="$PWD"; fi

source ${MASKDIR}/common/debug.sh
source ${LOGDIR}/call.sh

toBoolString() {
    declare -i _number

    unsetRetvals

    _number="${1:-}"

    if [ "${_number}" = 0 ]; then
        RETVAL1="true"
    else
        RETVAL1="false"
    fi
}

toNegationString() {
    declare -i _number

    unsetRetvals

    _number="${1:-}"

    if [ "${_number}" = 0 ]; then
        RETVAL1=""
    else
        RETVAL1="not"
    fi
}
