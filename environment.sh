#!/bin/bash
find . -type f -name '*.js' -exec sed -i "s#api.itbi#$API_URL#g" {} +
