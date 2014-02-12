#!/bin/bash
curl "http://localhost:8081/compile?appRoot=$1&appName=$2&androidTarget=4"
echo ""
