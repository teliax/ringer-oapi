#!/bin/bash

# This script validates the OpenAPI files using the OpenAPI validator

echo "Validating OpenAPI files..."
echo "================================================================================"

# Check if the appropriate validator is installed
if ! command -v npx &> /dev/null; then
    echo "npx not found. Please install Node.js and npm."
    exit 1
fi

# Validate the main specification files only
echo "Validating openapi/ringer/telique.yaml..."
npx @redocly/cli lint openapi/ringer/telique.yaml

echo "Validating openapi/ringer_business/main.yaml..."
npx @redocly/cli lint openapi/ringer_business/main.yaml

# Output validation results
if [ $? -eq 0 ]; then
    echo "================================================================================"
    echo "✅ Validation successful! All files are valid OpenAPI 3.0.3 specifications."
else
    echo "================================================================================"
    echo "❌ Validation failed. Please fix the issues above."
    exit 1
fi 