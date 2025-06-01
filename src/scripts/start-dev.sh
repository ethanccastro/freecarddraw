#!/bin/bash
cd /Users/ethan/Documents/OneDrive/ethan/Projects/giftcard-giveaway

if [ -f .env.local ]; then
    export $(cat .env.local | xargs)
else
    echo "Error: .env.local file is not found."
    fi


nodemon server.ts