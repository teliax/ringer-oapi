# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a "Docs as Code" repository containing OpenAPI 3.0.3 specifications for Ringer's RESTful HTTP APIs. The specs define three API domains:
- **Telique API** (`openapi/ringer/telique.yaml`) - Telecommunications data services (CNAM, LRN, DNO/DNC, STIR/SHAKEN)
- **Ivy API** (`openapi/ringer-business/ivy.yaml`) - UCaaS/business services (accounts, sites, phone numbers, payments)
- **EMS API** (`openapi/ringer-mobile/ems.yaml`) - Mobile-specific services (currently under development)

## Common Commands

### Linting and Validation
```bash
# Lint a specific OpenAPI spec
npx @stoplight/spectral-cli lint openapi/ringer/telique.yaml
npx @stoplight/spectral-cli lint openapi/ringer-business/ivy.yaml
npx @stoplight/spectral-cli lint openapi/ringer-mobile/ems.yaml

# Lint all specs
npx @stoplight/spectral-cli lint "openapi/**/*.yaml"
```

### Git Workflow
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit changes
git add .
git commit -m "Description of changes"

# Push to fork
git push origin feature/your-feature-name
```

## Architecture

### OpenAPI Spec Organization
Each API domain is self-contained in a single YAML file with:
- **info**: Metadata, versioning, contact info, authentication overview
- **servers**: Production endpoints (Telique/Mobile use api.ringer.tel/v1, Ivy uses uc.leap.tel/v2)
- **components**:
  - `securitySchemes`: Authentication methods (IP whitelist for Telique, OAuth2 for Ivy/Mobile)
  - `schemas`: Reusable data models
  - `responses`: Reusable response definitions
  - `parameters`: Reusable parameter definitions
- **paths**: API endpoints with full request/response documentation
- **tags**: Logical grouping of endpoints

### Authentication Patterns
- **Telique API**: IP whitelist authentication (X-Forwarded-For header)
- **Ivy API**: OAuth 2.0 client credentials flow
- **EMS API**: OAuth 2.0 (placeholder, flows TBD)

### Version Change Detection
The GitHub workflow `.github/workflows/notify-sdk-publish.yml` automatically detects version changes in OpenAPI specs and triggers a repository dispatch event to `teliax/ringer-redoc` for documentation regeneration.

## Spectral Linting Rules

Custom linting rules are enforced via `.spectral.yaml`:

### Error-Level Rules
- All operations must have tags, operationId, and description
- At least one 2xx/3xx response required per operation
- Contact info required with `@ringer.tel` email domain
- Security schemes must be defined
- Info object must have description

### Warning-Level Rules
- Operations should have security defined
- Schemas should include examples
- Response content should include examples
- Schemas should specify required fields

## Critical Domain Knowledge

### Ivy API (Ringer Business)
The Ivy API has several critical implementation gotchas documented in its description:

**Data Type Requirements:**
- Country codes MUST be strings (e.g., `["1", "44"]` not `[1, 44]`)
- Integers cause 500 errors due to backend limitations

**Thin Client Permissions:**
- Access varies by customer account
- API silently removes unauthorized `thin_client_id` values
- No direct permission check endpoint - must test by attempting operations

**Field Validation:**
- DNS extensions: 2-32 chars, lowercase, no reserved words
- SIP passwords: Exactly 20 chars with mixed case, numbers, symbols
- Caller ID numbers: Digits only, no formatting

**Error Handling:**
- 400 errors = field validation failures
- 500 errors = often data type issues (integers vs strings)
- Always include `debug_id` in support requests

**Phone Number Categories:**
- `domestic`: US/Canada regular numbers
- `toll_free`: US toll-free numbers (800, 877, etc.)
- `international`: Non-US/Canada numbers

### Templates
The `templates/` directory contains base templates for each API domain that can be used when creating new specs or adding major sections.

## File Naming Conventions
- Use `kebab-case` for file names
- Use `camelCase` for property names in schemas
- YAML files use `.yaml` extension (not `.yml` where possible)

## Version Management
All three main API specs track versions independently in their `info.version` field:
- Telique: Currently v1.0.18
- Ivy: Currently v1.0.6
- EMS: Currently v0.1.0 (under development)

Version changes trigger automatic documentation updates via GitHub Actions.

## Contact Information
All specs must include:
- `contact.name`: "Ringer API Support"
- `contact.email`: Support address with `@ringer.tel` domain
- `contact.url`: Link to docs.ringer.tel or support page
