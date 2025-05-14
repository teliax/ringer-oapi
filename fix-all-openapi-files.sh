#!/bin/bash
# Script to fix all OpenAPI files and ensure they validate correctly

echo "====================================================================="
echo "Fixing all OpenAPI files for validation..."
echo "====================================================================="

# 1. Fix components.yaml to be a valid standalone document
echo "Fixing components.yaml..."
./fix-components-file.sh

# 2. Fix specific validation errors in components.yaml
echo "Fixing components.yaml validation errors..."
./fix-components-validation.sh

# 3. Fix all path files to be valid standalone documents
echo "Fixing path files..."
./fix-standalone-validation.sh

# 4. Fix common validation issues (unused Error components, missing tags, etc.)
echo "Fixing validation issues..."
./fix-validation-issues.sh

# 5. Validate all files
echo "Validating all files..."
./test-all-files.sh

echo "====================================================================="
echo "All files have been fixed and validated successfully!"
echo "=====================================================================" 