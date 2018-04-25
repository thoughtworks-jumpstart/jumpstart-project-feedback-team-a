#!/usr/bin/env bash

set -e

## 1. run unit tests (client)
yarn test

## 3. run e2e tests
# background your server
yarn start &
# wait 7 seconds for app to start
sleep 7
# and now run cypress
$(yarn bin)/cypress run

# stop server
lsof -i tcp:3000 | grep LISTEN | awk '{print $2}' | xargs kill 
lsof -i tcp:3001 | grep LISTEN | awk '{print $2}' | xargs kill 
