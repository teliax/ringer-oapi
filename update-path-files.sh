#!/bin/bash

# Script to add a header comment to all path files
for file in openapi/ringer_business/*.yaml; do
  # Skip main.yaml and components.yaml
  if [[ "$file" != *"main.yaml"* && "$file" != *"components.yaml"* ]]; then
    echo "Adding header to $file"
    # Create a temp file with the header and content
    {
      echo "# THIS IS A PARTIAL OPENAPI FILE"
      echo "# This file contains only path objects and is not meant to be validated standalone."
      echo "# It is referenced by main.yaml which contains the complete OpenAPI document."
      echo ""
      cat "$file"
    } > "$file.tmp"
    
    # Replace the original file
    mv "$file.tmp" "$file"
  fi
done

echo "All path files have been updated with headers." 