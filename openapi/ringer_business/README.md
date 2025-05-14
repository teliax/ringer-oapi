# IVY API Documentation

This directory contains the OpenAPI 3.0.3 specification for the IVY API, split into a modular structure for better maintainability.

## Structure Overview

- `main.yaml`: The root document that contains all OpenAPI metadata and references to path files
- `components.yaml`: Contains all schema definitions and security schemes
- Individual path files (e.g., `users.yaml`, `account.yaml`): Each contains API operations for a specific resource

## Working with the Files

### Adding or Updating API Endpoints

1. Find the appropriate path file or create a new one
2. Each path file should follow this structure:
   ```yaml
   paths:
     /resource-name:
       get:
         # operation details...
       post:
         # operation details...
   ```
3. Reference schemas from components.yaml using `$ref: './components.yaml#/components/schemas/SchemaName'`

### Adding New Schemas

Add new schema definitions to `components.yaml` under the `components.schemas` section.

### Important Considerations

- Don't add OpenAPI metadata (`openapi:`, `info:`, etc.) to the individual path files - these belong only in `main.yaml`
- Always add tags for new endpoints in the `tags` section of `main.yaml`
- Add new path references to the `paths` section in `main.yaml` when creating new path files

## Validation

Our CI/CD pipeline validates the OpenAPI specification. To pass validation, ensure:

1. All path files contain only path objects and operations
2. All references are correct and point to existing objects
3. All operations are properly tagged with tags defined in main.yaml 