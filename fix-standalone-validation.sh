#!/bin/bash

# Script to make each path file a complete valid standalone OpenAPI document
for file in openapi/ringer_business/*.yaml; do
  # Skip main.yaml and components.yaml
  if [[ "$file" != *"main.yaml"* && "$file" != *"components.yaml"* ]]; then
    echo "Converting $file to fully compliant standalone document"
    
    # Extract the file base name without extension
    basename=$(basename "$file" .yaml)
    # Convert kebab-case to Title Case for tag name
    tag_name=$(echo "$basename" | sed -E 's/(^|-)([a-z])/\U\2/g' | sed 's/-/ /g')
    
    # Extract just the paths section from the file
    paths_content=$(grep -A 1000 "^paths:" "$file" | grep -v "^#" || echo "paths: {}")
    
    # Create a temp file with the complete OpenAPI structure
    {
      echo "# THIS IS A PARTIAL OPENAPI FILE"
      echo "# This file contains path objects intended to be referenced by main.yaml"
      echo "# The following structure is added for standalone validation purposes only"
      echo ""
      echo "openapi: 3.0.3"
      echo "info:"
      echo "  title: IVY API - $tag_name"
      echo "  description: This is a partial file containing path objects for the IVY API. It defines operations related to $tag_name."
      echo "  version: 1.0.0"
      echo "  contact:"
      echo "    name: IVY API Support"
      echo "    url: https://ivy.teliax.com/"
      echo "    email: support@ivy.teliax.com"
      echo "  license:"
      echo "    name: MIT License"
      echo "    url: https://github.com/teliax/ringer-oapi/blob/main/LICENSE"
      echo "  x-partial-file: true"
      echo "servers:"
      echo "  - url: http://ivy-api.teliax.com"
      echo "    description: Production server"
      echo "tags:"
      echo "  - name: $tag_name"
      echo "    description: Operations related to $tag_name"
      echo "security:"
      echo "  - apiKey: []"
      echo "components:"
      echo "  securitySchemes:"
      echo "    apiKey:"
      echo "      type: apiKey"
      echo "      in: header"
      echo "      name: Authorization"
      echo "  schemas:"
      echo "    Error:"
      echo "      type: object"
      echo "      properties:"
      echo "        code:"
      echo "          type: integer"
      echo "        message:"
      echo "          type: string"
      echo ""
      echo "$paths_content" | sed -E "s/- [A-Za-z ]+$/- $tag_name/g"
    } > "$file.tmp"
    
    # Replace the original file
    mv "$file.tmp" "$file"
  fi
done

echo "All path files have been converted to fully compliant standalone documents." 