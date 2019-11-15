#!/bin/bash

debugOn() {
    echo "bash debugging ON"
    set -x
}

debugOff() {
    echo "bash debugging OFF"
    set +x
}

if ([ -n "${DEBUG}" ]); then
    debugOn
fi
