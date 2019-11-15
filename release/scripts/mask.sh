#!/bin/bash

MASKDIR="${BASH_SOURCE%/*}"
if [[ ! -d "$MASKDIR" ]]; then MASKDIR="$PWD"; fi

source ${MASKDIR}/common/debug.sh
source ${MASKDIR}/common/log.sh
source ${MASKDIR}/common/call.sh
source ${MASKDIR}/common/convert.sh

numberToBin() {
    declare -i _number

    unsetRetvals

    _number="${1:-}"

    # https://stackoverflow.com/questions/10278513/bash-shell-decimal-to-binary-base-2-conversion

    # range 0 to 255 is quantum satis for exit codes
    declare -r D2B=({0..1}{0..1}{0..1}{0..1}{0..1}{0..1}{0..1}{0..1})
    RETVAL1=${D2B[$_number]}
    logsysout "Converted ${_number} to ${RETVAL1}" "DEBUG"
}

xorTwo() {
    declare -i _mask
    declare -i _maskee

    unsetRetvals

    _mask="${1:-}"
    _maskee="${2:-}"

    # https://stackoverflow.com/questions/42505552/bash-command-xor-anothercommand
    RETVAL1=$(($_mask ^ $_maskee))
    logsysout "Masked ${_maskee} with ${_mask} to ${RETVAL1}" "DEBUG"
}

sufficient() {
    declare -i _actualCode
    declare -i _expectedCode
    declare -i __actualCode_mask
    declare -i __expectedCode_mask
    declare -i __result

    unsetRetvals

    _actualCode="${1:-}"
    _expectedCode="${2:-}"

    numberToBin $_actualCode
    __actualCode_mask=$RETVAL1
    numberToBin $_expectedCode
    __expectedCode_mask=$RETVAL1

    xorTwo $__actualCode_mask $__expectedCode_mask
    __result=RETVAL1
    if [ "$__result" -eq "0" ]; then
        __result=0
    else
        __result=1
    fi
    toNegationString $__result
    resultStringified=$RETVAL1
    logsysout "actual code ${_actualCode} and ${_expectedCode} did ${resultStringified} match" "DEBUG"
}

declare -i r_sufficient
r_sufficient=1

sufficient 72 1
r_sufficient=$RETVAL1

echo $r_sufficient

debugOff

exit $r_sufficient
