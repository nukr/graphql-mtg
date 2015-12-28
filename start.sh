#!/bin/bash

if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
fi

pm2 start ./src/utils/runner.js --name="dal" --no-daemon --watch
