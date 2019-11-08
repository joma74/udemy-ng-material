#!/bin/bash

# echo ${D2B[7]}
# echo ${D2B[1]}

set -x

declare -i a_numberToBin
declare -a r_numberToBin
declare -i xor

numberToBin() {
    # https://stackoverflow.com/questions/10278513/bash-shell-decimal-to-binary-base-2-conversion

    # range 0 to 255 is quantum satis for exit codes
    local D2B=({0..1}{0..1}{0..1}{0..1}{0..1}{0..1}{0..1}{0..1})
    r_numberToBin=${D2B[$a_numberToBin]}
}

declare -i a_xorTwo_1mask
declare -i a_xorTwo_2maskee
declare -a r_xorTwo

xorTwo() {
    r_xorTwo=$(($a_xorTwo_1mask ^ $a_xorTwo_2maskee))
}

declare -i a_sufficient_1actualCode
declare -i a_sufficient_2expectedCode
declare -i r_sufficient
r_sufficient=1

sufficient() {
    a_numberToBin=$a_sufficient_1actualCode
    numberToBin
    a_xorTwo_1mask=$r_numberToBin
    a_numberToBin=$a_sufficient_2expectedCode
    numberToBin
    a_xorTwo_2maskee=$r_numberToBin
    xorTwo
    result=$r_xorTwo
    if [ "$result" -eq "0" ]; then
        r_sufficient=0
    else
        r_sufficient=1
    fi
}

a_sufficient_1actualCode=72
a_sufficient_2expectedCode=1
sufficient

echo $r_sufficient
