# IVY API Documentation

This directory contains the OpenAPI specification for the IVY API, split into multiple files for maintainability.

## File Structure

- `main.yaml`: The main entry point for the API specification
- `components.yaml`: Contains all schema definitions and security schemes
- Individual endpoint files (e.g., `oauth.yaml`, `users.yaml`): Each contains paths for a specific API area

## Working with the Split Files

Each file is designed to be a standalone OpenAPI document that can be edited and validated individually.

To combine all files into a single OpenAPI document for validation or deployment, use the provided script:

```bash
./combine-api-docs.sh
```

This will create `ivy-combined.yaml` which contains the complete API specification.

## Updating the API

1. To add a new endpoint, create or edit the appropriate path file
2. To add new schema definitions, edit the `components.yaml` file
3. Run the combine script to validate the complete API

## References

All references use the format `./components.yaml#/components/schemas/SchemaName` to reference schemas from the components file. 