#!/usr/bin/env bash

APP_URL=$1
HTTP_RESPONSE_STATUS=$(curl -sLI ${APP_URL} | head -n 1 | cut -d$' ' -f2)

if [[ ${HTTP_RESPONSE_STATUS} == '200' ]]; then
    echo "INFO: Received HTTP status code of ${HTTP_RESPONSE_STATUS} for ${APP_URL}"
    echo "Smoke test passed"
    exit 0
else
    echo "ERROR: Received HTTP status code of ${HTTP_RESPONSE_STATUS} for ${APP_URL}"
    exit 1
fi
