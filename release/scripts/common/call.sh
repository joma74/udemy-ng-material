#!/bin/bash

CALLDIR="${BASH_SOURCE%/*}"
if [[ ! -d "$CALLDIR" ]]; then CALLDIR="$PWD"; fi

function unsetRetvals() {

    unset RETVAL1 RETVAL2 RETVAL3 RETVAL4 RETVAL5

}
