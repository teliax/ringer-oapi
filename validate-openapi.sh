#!/bin/bash

# This script validates the OpenAPI files using the OpenAPI validator

echo "Validating OpenAPI files..."
echo "================================================================================"

# Check if openapi-validator is installed
if ! command -v openapi-validator &> /dev/null; then
    echo "openapi-validator not found. Installing..."
    npm install -g @redocly/openapi-cli
fi

# Validate the main specification file
echo "Validating main.yaml..."
openapi-validator lint openapi/ringer_business/main.yaml

# Output validation results
if [ $? -eq 0 ]; then
    echo "================================================================================"
    echo "✅ Validation successful! All files are valid OpenAPI 3.0.3 specifications."
else
    echo "================================================================================"
    echo "❌ Validation failed. Please fix the issues above."
    exit 1
fi 