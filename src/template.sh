#!/bin/bash -euf

ran_without_errors="yes"
allow_optionals_to_be_missing="no"

if [ $# -eq 1 ]; then
    if [ "$1" = "--optionals" ]; then
        allow_optionals_to_be_missing="yes"
    else
        printf "Invalid argument '%s'\n" "$1" >&2
        exit 2
    fi
elif [ $# -ne 0 ]; then
    printf "Invalid number of arguments\n" >&2
    exit 2
fi

if [ "$allow_optionals_to_be_missing" = "yes" ]; then
    printf "Optional missing entries will not cause a program error\n"
fi
