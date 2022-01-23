#!/bin/bash
#
# /A lot of this is based on options.bash by Daniel Mills.
# @see https://github.com/e36freak/tools/blob/master/options.bash

# Preamble {{{

# Exit immediately on error
docker-compose start nodedb
docker-compose start redis
docker-compose stop app
npm run local