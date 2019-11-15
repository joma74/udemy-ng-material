#!/bin/bash

LOGDIR="${BASH_SOURCE%/*}"
if [[ ! -d "$LOGDIR" ]]; then LOGDIR="$PWD"; fi

source ${LOGDIR}/call.sh

function logsysout() {
    declare _message _logLevel _paddedLogLevel _caller

    _message="${1:-}"
    _logLevel="${2:-}"

    if ([[ -z $_logLevel ]]); then
        _paddedLogLevel=$(printf "%-5s" "INFO")
    else
        _paddedLogLevel=$(printf "%-5s" $_logLevel)
    fi

    _caller=$(caller 0)
    _caller=$(printf "%-30s" "$_caller")

    echo "$(date '+%Y-%m-%d %H:%M:%S') [$_caller] [$_paddedLogLevel] $_message"
}
