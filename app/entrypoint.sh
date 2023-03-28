#!/usr/bin/bash

yarn build && yarn install --production --ignore-scripts --prefer-offline

/app/node_modules/.bin/next start