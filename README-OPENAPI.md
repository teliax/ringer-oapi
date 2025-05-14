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

1. **main.yaml**: This is the entry point and the only complete OpenAPI document. It contains:
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

3. **Individual path files**: Each resource has its own file containing only path objects:
   - Contains operations for specific endpoints (GET, POST, etc.)
   - References schemas from components.yaml
   - Not valid standalone OpenAPI documents

## Validation

To validate the OpenAPI specifications, use the provided validation script:

```bash
./validate-openapi.sh
```

This script validates only the main entry point files:
- `openapi/ringer/telique.yaml`
- `openapi/ringer_business/main.yaml`

**Note**: Individual path files are not meant to be validated standalone as they are partial OpenAPI documents. They contain appropriate header comments indicating this.

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

4. Keep consistent formatting:
   - Use 2-space indentation
   - Add appropriate descriptions for endpoints and schemas
   - Follow existing patterns for consistency

## Referencing Schemas

When referencing schemas from path files, use the following format:
```yaml
$ref: './components.yaml#/components/schemas/SchemaName'
``` 