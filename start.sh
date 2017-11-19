#!/bin/bash
cd /var/www

if [ ! -d "node_modules/yarn" ]; then
  npm i yarn
else
  echo "yarn alredy installed"
fi
./node_modules/yarn/bin/yarn install --verbose
./node_modules/yarn/bin/yarn start
