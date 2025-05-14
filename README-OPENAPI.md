# Ringer OpenAPI Documentation

This directory contains the OpenAPI specifications for Ringer's APIs. The specifications are organized in a modular way for better maintainability.

## Structure

- `openapi/ringer/telique.yaml`: Complete OpenAPI specification for the Ringer Telique API
- `openapi/ringer_business/`: Modular OpenAPI specification for the Ringer Business API
  - `main.yaml`: The root document containing metadata, servers, security schemes, and references to path files
  - `components.yaml`: Contains all schema definitions and other reusable components
  - Individual path files (e.g., `users.yaml`, `account.yaml`): Each file contains endpoints for a specific resource

## Modular Structure Explanation

The OpenAPI specification for the Ringer Business API is split into multiple files for easier maintenance:

1. **main.yaml**: This is the entry point and the complete OpenAPI document. It contains:
   - OpenAPI version
   - API information (title, description, version)
   - Server configurations
   - Security requirements
   - Tag definitions
   - References to path files using `$ref` syntax

2. **components.yaml**: Contains all reusable components:
   - Schema definitions
   - Security schemes
   - Parameter definitions
   - Response definitions

3. **Individual path files**: Each resource has its own file that is:
   - A valid standalone OpenAPI document (for validation purposes)
   - Referenced by main.yaml for its paths content
   - Contains a complete OpenAPI structure with proper metadata
   - Includes tags, security schemes, and minimal components

## Path File Structure

Each path file is structured as a complete OpenAPI document to pass validation:

```yaml
# THIS IS A PARTIAL OPENAPI FILE
# This file contains path objects intended to be referenced by main.yaml
# The following structure is added for standalone validation purposes only

openapi: 3.0.3
info:
  title: IVY API - Resource Name
  description: This is a partial file containing path objects for the IVY API.
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
  - name: Resource Name
    description: Operations related to Resource Name
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
  # Path definitions that will be referenced by main.yaml
```

## Validation

To validate the OpenAPI specifications, use the provided validation script:

```bash
./validate-openapi.sh
```

This script validates:
- `openapi/ringer/telique.yaml`
- `openapi/ringer_business/main.yaml`

To validate all files including individual path files:
```bash
./test-all-files.sh
```

To validate against Spectral rules:
```bash
npx @stoplight/spectral-cli lint --ruleset .spectral.yaml openapi/ringer_business/*.yaml
```

## Editing Guidelines

When modifying the API documentation:

1. Use `main.yaml` to:
   - Update general API information
   - Add or modify tags
   - Add new path references when creating new path files

2. Use `components.yaml` to:
   - Add or modify schema definitions
   - Add or modify security schemes

3. Use individual path files to:
   - Add or modify endpoints for specific resources
   - Reference components using `$ref: './components.yaml#/components/schemas/SchemaName'`
   - Maintain the existing OpenAPI header structure

4. Keep consistent formatting:
   - Use 2-space indentation
   - Add appropriate descriptions for endpoints and schemas
   - Follow existing patterns for consistency

## Creating New Path Files

When creating a new path file, use our script to generate a compliant file:

```bash
./create-path-file.sh resource-name
```

Or manually follow the template shown in the "Path File Structure" section above.

Then add a reference to it in `main.yaml` under the paths section:

```yaml
# In main.yaml
paths:
  # Other paths...
  /resource-name:
    $ref: './resource-name.yaml#/paths/~1resource-name'
```

## Maintenance Scripts

The repository includes several utility scripts:

1. **validate-openapi.sh**: Validates the main OpenAPI files
2. **test-all-files.sh**: Tests validation for all files including individual path files
3. **fix-standalone-validation.sh**: Converts path files to fully compliant standalone OpenAPI documents
4. **create-path-file.sh**: Creates a new properly structured path file (see below)

## Creating a New Path File Script

Here's a simple example of how to create a new path file:

```bash
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
echo "Remember to add the path reference to main.yaml and update components.yaml with any new schemas." 