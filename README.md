# Ringer OpenAPI Docs as Code

This repository contains the OpenAPI specifications and documentation for Ringer's RESTful HTTP APIs. It follows a "Docs as Code" approach, enabling version-controlled, collaborative API documentation.

## Repository Structure

- `/openapi/` - OpenAPI specification files organized by business entity
  - `/openapi/ringer/` - Specifications for Ringer APIs
  - `/openapi/ringer-business/` - Specifications for Ringer Business APIs
  - `/openapi/ringer-mobile/` - Specifications for Ringer Mobile APIs
- `/docs/` - Next.js documentation site source

## Documentation Website

The documentation website is built with Next.js and MDX, hosted on Vercel and available at [https://docs.ringer.tel/](https://docs.ringer.tel/).

## OpenAPI Specifications

Our API specifications follow the [OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3) standard. The specs are stored in YAML format in the `/openapi` directory, organized by business domain.

### Working with OpenAPI Specs

You can use various tools to work with our OpenAPI specifications:

- **[Swagger Editor](https://editor.swagger.io/)**: Paste the YAML content for visual editing
- **[Stoplight Studio](https://stoplight.io/studio)**: A powerful GUI editor for OpenAPI
- **[Insomnia](https://insomnia.rest/)**: An API client that can import OpenAPI specs

### Contributing to the Specs

We welcome contributions to improve our API documentation! Here's how to contribute:

1. Fork this repository
2. Make your changes to the relevant OpenAPI specification files
3. Validate your changes against the OpenAPI 3.0.3 specification
4. Submit a pull request with a clear description of your changes

When contributing, please:

- Follow the existing formatting and organization patterns
- Include descriptive summaries and examples where appropriate
- Add proper schema definitions for all request/response objects
- Ensure your changes pass OpenAPI validation

## API Endpoints

Ringer API endpoints are accessible at:

```
https://api.ringer.tel/v1/{endpoint}
```

## Local Development

To run the documentation site locally:

```bash
# Navigate to the docs directory
cd docs

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at http://localhost:3000.

### Keeping Documentation in Sync

When the OpenAPI specs are updated, the documentation site automatically reflects those changes because it reads directly from the specification files. If you're using a separate repository for the documentation site, you can use the sync script to keep the specs in sync:

```bash
cd docs
npm run sync-specs
```

## OpenAPI Validation

To validate your OpenAPI specifications, you can use the following tools:

- [Spectral](https://github.com/stoplightio/spectral) - A flexible JSON/YAML linter with OpenAPI support
- [OpenAPI Validator](https://github.com/OpenAPITools/openapi-validator) - Official validator for OpenAPI specs

## License

[Include appropriate license information]

## Contact

For questions or support related to our APIs, please contact [support@ringer.tel](mailto:support@ringer.tel). 