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

3. **Individual path files**: Each resource has its own file containing path objects:
   - Contains operations for specific endpoints (GET, POST, etc.)
   - References schemas from components.yaml
   - Has minimal OpenAPI structure to be valid standalone (for validation)
   - Contains clear comments explaining its partial nature and relationship to main.yaml

## Path File Structure

Each path file has been structured to be both:
1. A valid reference for the main document
2. A valid standalone OpenAPI document for CI validation

The files include a minimal OpenAPI structure at the top:
```yaml
# THIS IS A PARTIAL OPENAPI FILE
# This file contains path objects intended to be referenced by main.yaml
# The following structure is added for standalone validation purposes only

openapi: 3.0.3
info:
  title: Partial OpenAPI Document
  description: This is a partial file containing path objects for the IVY API.
  version: 1.0.0
  contact:
    name: IVY API Support
    url: https://ivy.teliax.com/
    email: support@ivy.teliax.com
  x-partial-file: true
servers:
  - url: http://ivy-api.teliax.com
    description: Production server
# Below is the actual content referenced by main.yaml

paths:
  # Path definitions...
```

## Validation

To validate the OpenAPI specifications, use the provided validation script:

```bash
./validate-openapi.sh
```

This script validates:
- `openapi/ringer/telique.yaml`
- `openapi/ringer_business/main.yaml`

Individual path files can also be validated directly:
```bash
npx swagger-cli validate openapi/ringer_business/users.yaml
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

When creating a new path file, use the following template:

```yaml
# THIS IS A PARTIAL OPENAPI FILE
# This file contains path objects intended to be referenced by main.yaml
# The following structure is added for standalone validation purposes only

openapi: 3.0.3
info:
  title: Partial OpenAPI Document
  description: This is a partial file containing path objects for the IVY API.
  version: 1.0.0
  contact:
    name: IVY API Support
    url: https://ivy.teliax.com/
    email: support@ivy.teliax.com
  x-partial-file: true
servers:
  - url: http://ivy-api.teliax.com
    description: Production server
# Below is the actual content referenced by main.yaml

paths:
  /your-resource:
    get:
      tags:
        - Your Resource Tag
      summary: Brief description
      description: Detailed description of the endpoint
      operationId: get_your_resource
      responses:
        "200":
          description: Success response
          content:
            application/json:
              schema:
                $ref: './components.yaml#/components/schemas/YourSchema'
```

Then add a reference to it in `main.yaml` under the paths section:

```yaml
# In main.yaml
paths:
  # Other paths...
  /your-resource:
    $ref: './your-resource.yaml#/paths/~1your-resource'
```

## Referencing Schemas

When referencing schemas from path files, use the following format:
```yaml
$ref: './components.yaml#/components/schemas/SchemaName'
``` 