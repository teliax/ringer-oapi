#!/bin/bash
# create-path-file.sh
# Usage: ./create-path-file.sh resource-name

if [ -z "$1" ]; then
  echo "Usage: ./create-path-file.sh resource-name"
  exit 1
fi

resource_name=$1
file_name="openapi/ringer_business/${resource_name}.yaml"
tag_name=$(echo "$resource_name" | sed -E 's/(^|-)([a-z])/\U\2/g' | sed 's/-/ /g')
path_name="/${resource_name}"

# Create the file with proper structure
cat > "$file_name" << EOF
# THIS IS A PARTIAL OPENAPI FILE
# This file contains path objects intended to be referenced by main.yaml
# The following structure is added for standalone validation purposes only

openapi: 3.0.3
info:
  title: IVY API - ${tag_name}
  description: This is a partial file containing path objects for the IVY API. It defines operations related to ${tag_name}.
  version: 1.0.0
  contact:
    name: IVY API Support
    url: https://ivy.teliax.com/
    email: support@ivy.teliax.com
  license:
    name: MIT License
    url: https://github.com/teliax/ringer-oapi/blob/main/LICENSE
  x-partial-file: true
servers:
  - url: http://ivy-api.teliax.com
    description: Production server
tags:
  - name: ${tag_name}
    description: Operations related to ${tag_name}
security:
  - apiKey: []
components:
  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: Authorization
  schemas:
    Error:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string

paths:
  ${path_name}:
    get:
      tags:
        - ${tag_name}
      summary: List all ${tag_name}
      description: Returns a list of all ${tag_name}.
      operationId: list_${resource_name}
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                \$ref: './components.yaml#/components/schemas/YourSchemaName'
        "400":
          description: Bad Request
          content:
            application/json:
              schema:
                \$ref: './components.yaml#/components/schemas/error'
EOF

echo "Created ${file_name}"
echo ""
echo "Remember to:"
echo "1. Add the path reference to main.yaml:"
echo ""
echo "  # In main.yaml under paths section"
echo "  ${path_name}:"
echo "    \$ref: './${resource_name}.yaml#/paths~1${resource_name}'"
echo ""
echo "2. Update components.yaml with any new schemas needed"
echo "3. Replace 'YourSchemaName' with an actual schema name in the new file" 