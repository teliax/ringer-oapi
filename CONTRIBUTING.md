# Contributing to Ringer OpenAPI

Thank you for your interest in contributing to Ringer's OpenAPI specifications! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
   - Create your own copy of the repository by forking it on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ringer-oapi.git
   cd ringer-oapi
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

### OpenAPI File Structure

All API specifications are in the `openapi` directory, organized by business domain:
- `openapi/ringer/` - Core Ringer APIs
- `openapi/ringer-business/` - Business-focused APIs
- `openapi/ringer-mobile/` - Mobile-specific APIs

### Guidelines for Changes

1. **Follow OpenAPI 3.0.3 Specification**
   - All files must comply with the [OpenAPI 3.0.3 standard](https://spec.openapis.org/oas/v3.0.3)

2. **Validate Your Changes**
   - Use the Spectral linter to validate your changes:
     ```bash
     npx @stoplight/spectral-cli lint openapi/your-file.yaml
     ```

3. **Include Complete Information**
   - Every endpoint should have:
     - Clear descriptions
     - All parameters documented
     - Request and response schemas defined
     - Examples provided where helpful

4. **Maintain Backward Compatibility**
   - Changes should not break existing API clients
   - For breaking changes, use proper versioning

## Submitting Changes

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Go to the [original repository](https://github.com/ringer/ringer-oapi)
   - Click "New Pull Request"
   - Select "compare across forks"
   - Select your fork and branch

4. **Wait for Review**
   - Maintainers will review your PR
   - Address any feedback or requested changes

## Style Guide

1. **YAML Formatting**
   - Use 2 spaces for indentation
   - Keep lines under 100 characters where possible

2. **Naming Conventions**
   - Use `camelCase` for property names
   - Use `kebab-case` for file names
   - Use descriptive names for schemas and operations

3. **Documentation**
   - Write clear, concise descriptions
   - Use proper English and check spelling

## Additional Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Spectral Documentation](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview)
- [Swagger Editor](https://editor.swagger.io/)

Thank you for contributing to Ringer's API documentation! 