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

## API Endpoints

Ringer API endpoints are accessible at:

```
https://api.ringer.tel/v1/{endpoint}
```

## Contributing

We welcome contributions from both internal team members and external developers. To contribute:

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your OpenAPI specifications adhere to the OAS 3.0 standard and pass validation.

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

## License

[Include appropriate license information]

## Contact

For questions or support related to our APIs, please contact [support@ringer.tel](mailto:support@ringer.tel). 