#!/bin/bash

# Test script to validate all OpenAPI files including individual path files

echo "Testing all OpenAPI files for validation..."
echo "================================================================================"

# First, validate the main files
echo "Validating main files..."
npx swagger-cli validate openapi/ringer/telique.yaml
npx swagger-cli validate openapi/ringer_business/main.yaml

echo ""
echo "Validating individual path files..."
# Then validate all individual path files
for file in openapi/ringer_business/*.yaml; do
  # Skip main.yaml and components.yaml
  if [[ "$file" != *"main.yaml"* && "$file" != *"components.yaml"* ]]; then
    echo "Validating $file..."
    npx swagger-cli validate "$file"
    if [ $? -ne 0 ]; then
      echo "❌ ERROR: $file failed validation!"
      exit 1
    fi
  fi
done

echo ""
echo "✅ All files passed validation successfully!" 