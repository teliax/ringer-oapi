#!/bin/bash

# Script to make each path file a valid standalone OpenAPI document
for file in openapi/ringer_business/*.yaml; do
  # Skip main.yaml and components.yaml
  if [[ "$file" != *"main.yaml"* && "$file" != *"components.yaml"* ]]; then
    echo "Converting $file to valid standalone document"
    # Create a temp file with the wrapper and content
    {
      echo "# THIS IS A PARTIAL OPENAPI FILE"
      echo "# This file contains path objects intended to be referenced by main.yaml"
      echo "# The following structure is added for standalone validation purposes only"
      echo ""
      echo "openapi: 3.0.3"
      echo "info:"
      echo "  title: Partial OpenAPI Document"
      echo "  description: This is a partial file containing path objects for the IVY API."
      echo "  version: 1.0.0"
      echo "  contact:"
      echo "    name: IVY API Support"
      echo "    url: https://ivy.teliax.com/"
      echo "    email: support@ivy.teliax.com"
      echo "  x-partial-file: true"
      echo "servers:"
      echo "  - url: http://ivy-api.teliax.com"
      echo "    description: Production server"
      echo "# Below is the actual content referenced by main.yaml"
      echo ""
      cat "$file"
    } > "$file.tmp"
    
    # Replace the original file
    mv "$file.tmp" "$file"
  fi
done

echo "All path files have been converted to valid standalone documents." 