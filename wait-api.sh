#!/bin/sh
# wait-for-api.sh
set -e
host="$1"
shift
until curl -sf http://$host/health > /dev/null; do
  echo "Waiting for $host..."
  sleep 2
done
