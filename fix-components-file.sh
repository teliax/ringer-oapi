#!/bin/bash
# Script to make components.yaml a valid standalone OpenAPI document

echo "Converting components.yaml to a valid standalone document"

# Extract just the components section
components_content=$(grep -A 100000 "^components:" openapi/ringer_business/components.yaml)

# Create a temp file with the proper OpenAPI structure
cat > openapi/ringer_business/components.yaml.tmp << EOF
# THIS IS A PARTIAL OPENAPI FILE
# This file contains only component definitions intended to be referenced by path files
# The following structure is added for standalone validation purposes only

openapi: 3.0.3
info:
  title: IVY API - Components
  description: This file contains reusable components for the IVY API.
  version: 1.0.0
  contact:
    name: IVY API Support
    url: https://ivy.teliax.com/
    email: support@ivy.teliax.com
  license:
    name: MIT License
    url: https://github.com/teliax/ringer-oapi/blob/main/LICENSE
servers:
  - url: http://ivy-api.teliax.com
    description: Production server
paths: {}
tags:
  - name: Components
    description: Common component definitions

# Below is the actual content referenced by other files
${components_content}
EOF

# Replace the original file
mv openapi/ringer_business/components.yaml.tmp openapi/ringer_business/components.yaml

echo "components.yaml has been converted to a valid standalone document." 