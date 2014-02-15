#!/bin/bash
echo "Starting Webserver"
./web/scripts/web-server.js >> webserver.log &

echo "Starting APIs"
cd engine; node AssemblyLineAPI.js >> engine.log &

echo "done"
