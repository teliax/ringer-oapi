#!/bin/bash
# Script to fix specific validation errors in components.yaml

echo "====================================================================="
echo "Fixing validation errors in components.yaml..."
echo "====================================================================="

COMPONENTS_FILE="openapi/ringer_business/components.yaml"

# 1. Fix the array-items error in Address schema
# Error: components.schemas.Address.allOf[1].properties.links - Schemas with "type: array", require a sibling "items" field
echo "Fixing missing 'items' field in Address.links array..."

# Create a temporary file
tmp_file=$(mktemp)

# Find the Address schema and add items to the links array
awk '
/Address:/ {in_address=1}
/links:/ && in_address && /type: array/ && !seen_links {
  print $0
  print "            items:"
  print "              $ref: '\''#/components/schemas/linkDescription'\''"
  seen_links=1
  next
}
{print}
' "$COMPONENTS_FILE" > "$tmp_file"

# Replace the original file with the temporary file
mv "$tmp_file" "$COMPONENTS_FILE"

# 2. Fix the no-$ref-siblings error in User schema
# Error: components.schemas.User.allOf[1].properties.features.description - $ref must not be placed next to any other properties
echo "Fixing \$ref siblings issue in User.features schema..."

# Create a temporary file
tmp_file=$(mktemp)

# Find the User schema and fix the features property
awk '
/User:/ {in_user=1}
/features:/ && in_user && !seen_features {
  print "          features:"
  next
}
/description:/ && in_user && !seen_features {
  # Store the description for later use
  description_line = $0
  next
}
/$ref:.*UserFeatures/ && in_user && !seen_features {
  # Create a new structure that separates description from $ref
  print "            type: object"
  print "            description: \"If existing set of calling features need to be assigned the to the user then various features can be assigned to a user. If new set of features need to be assigned then please pass the site_id and template_id. If the user is being updated then site_id and template_id will be ignored.\""
  print "            allOf:"
  print "              - $ref: '\''#/components/schemas/UserFeatures'\''"
  seen_features=1
  next
}
{print}
' "$COMPONENTS_FILE" > "$tmp_file"

# Replace the original file with the temporary file
mv "$tmp_file" "$COMPONENTS_FILE"

echo "====================================================================="
echo "Validation errors in components.yaml have been fixed!"
echo "=====================================================================" 