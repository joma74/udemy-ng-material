#!/bin/bash

echo "args: $@"

printenv | grep release

exit 0