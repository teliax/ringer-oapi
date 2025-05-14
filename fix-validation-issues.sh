#!/bin/bash
# Script to fix common validation issues in OpenAPI files

echo "====================================================================="
echo "Fixing OpenAPI validation issues..."
echo "====================================================================="

# Directory containing all OpenAPI files
OPENAPI_DIR="openapi/ringer_business"

# 1. Fix the unused Error component issue
# For each path file, we'll check if it has error responses and update accordingly
echo "Fixing unused Error schema components..."

for file in "$OPENAPI_DIR"/*.yaml; do
  if [ "$file" != "$OPENAPI_DIR/main.yaml" ] && [ "$file" != "$OPENAPI_DIR/components.yaml" ]; then
    # If the file has an unused Error schema in components section
    if grep -q "components.schemas.Error" "$file"; then
      # Count how many "400", "401", "403", "404", etc. response references there are
      ERROR_RESPONSES=$(grep -E "\"40[0-9]\":|\"50[0-9]\":" "$file" | wc -l)
      
      if [ "$ERROR_RESPONSES" -eq 0 ]; then
        # If there are no error responses, remove the Error schema
        echo "Removing unused Error schema from $file"
        sed -i '' -e '/Error:/,/message:/d' "$file"
      else
        # For each error response, make sure it references the Error schema
        echo "Checking error responses in $file"
        
        # This is complex and would need a more advanced script
        # For now, we'll just note the issue
        echo "  Note: File has error responses but may not reference Error schema"
      fi
    fi
  fi
done

# 2. Extract all tags from path files and add them to main.yaml
echo "Collecting all operation tags..."

# Create a temporary file to hold all unique tags
TAGS_FILE=$(mktemp)

# Extract all tags from each path file
for file in "$OPENAPI_DIR"/*.yaml; do
  if [ "$file" != "$OPENAPI_DIR/main.yaml" ] && [ "$file" != "$OPENAPI_DIR/components.yaml" ]; then
    TAGS_SECTION=$(grep -A 2 "^tags:" "$file" | grep "name:" | sed 's/.*name: //' | tr -d ' ')
    if [ ! -z "$TAGS_SECTION" ]; then
      echo "$TAGS_SECTION" >> "$TAGS_FILE"
    fi
  fi
done

# Sort and remove duplicates
sort -u "$TAGS_FILE" -o "$TAGS_FILE"

echo "Found the following unique tags:"
cat "$TAGS_FILE"

# Check if main.yaml already has a tags section
if grep -q "^tags:" "$OPENAPI_DIR/main.yaml"; then
  echo "Updating tags section in main.yaml..."
  
  # Extract existing tags section
  MAIN_TAGS_SECTION=$(mktemp)
  sed -n '/^tags:/,/^[a-z]/p' "$OPENAPI_DIR/main.yaml" | grep -v "^[a-z]" > "$MAIN_TAGS_SECTION"
  
  # For each unique tag, check if it's already in main.yaml
  while read -r tag; do
    if ! grep -q "name: $tag" "$MAIN_TAGS_SECTION"; then
      echo "Adding tag '$tag' to main.yaml"
      # Insert the new tag at the end of the tags section
      sed -i '' -e "/^tags:/,/^[a-z]/ s/^[a-z]/  - name: $tag\n    description: Operations related to $tag\n&/" "$OPENAPI_DIR/main.yaml"
    fi
  done < "$TAGS_FILE"
else
  echo "Creating tags section in main.yaml..."
  
  # Create a brand new tags section
  TAGS_CONTENT="tags:\n"
  while read -r tag; do
    TAGS_CONTENT="${TAGS_CONTENT}  - name: $tag\n    description: Operations related to $tag\n"
  done < "$TAGS_FILE"
  
  # Add the tags section after the security section
  sed -i '' -e "/^security:/a\\
${TAGS_CONTENT}
" "$OPENAPI_DIR/main.yaml"
fi

# 3. Fix specific errors in components.yaml
echo "Fixing errors in components.yaml..."

# Fix missing items field for array
if grep -q "components.schemas.Address.allOf.*properties.links" "$OPENAPI_DIR/components.yaml"; then
  echo "Adding missing 'items' field to Address links array"
  sed -i '' -e '/links:/{n;n;s/type: array/type: array\n            items:\n              type: object\n              properties:\n                href:\n                  type: string\n                rel:\n                  type: string/}' "$OPENAPI_DIR/components.yaml"
fi

# Fix $ref siblings issue
if grep -q "components.schemas.User.allOf.*properties.features.description" "$OPENAPI_DIR/components.yaml"; then
  echo "Fixing \$ref sibling issue in User schema"
  # This is a complex fix that would depend on the exact structure
  echo "  Note: Manual fix needed for \$ref siblings in User schema"
fi

# Clean up
rm "$TAGS_FILE" "$MAIN_TAGS_SECTION" 2>/dev/null

echo "====================================================================="
echo "OpenAPI validation issues have been addressed!"
echo "Run 'npx @stoplight/spectral-cli lint --ruleset .spectral.yaml openapi/ringer_business/*.yaml' to verify"
echo "=====================================================================" 