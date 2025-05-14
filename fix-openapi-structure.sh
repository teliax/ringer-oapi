#!/bin/bash

# Script to restructure OpenAPI files for proper multi-file support

# Files to process (excluding main.yaml and components.yaml)
FILES=(
  "account.yaml"
  "addresses.yaml"
  "call-blocks.yaml"
  "call-records.yaml"
  "confirmation.yaml"
  "country-codes.yaml"
  "credit-cards.yaml"
  "items.yaml"
  "oauth.yaml"
  "packages.yaml"
  "password.yaml"
  "payments.yaml"
  "phone-numbers.yaml"
  "plans.yaml"
  "sign-up.yaml" 
  "sites.yaml"
  "statements.yaml"
  "templates.yaml"
  "thin-clients.yaml"
  "timezones.yaml"
  "users.yaml"
)

echo "Fixing OpenAPI file structure..."

# Fix main.yaml to include proper path references
cat > "openapi/ringer_business/main.yaml" << EOF
openapi: 3.0.3
info:
  title: IVY API
  description: |-
    IVY is a turnkey, private-label solution that enables resellers and integrators to sell both SIP trunks and Hosted PBX features to their customers. IVY is unique in that the reseller is able to set prices and create plans while IVY does all of the billing.
    
    The IVY Customer API is organized around REST. The API uses resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website's client-side code). JSON is returned by all API responses, including errors.
  version: 1.0.0
  contact:
    name: IVY API Support
    url: https://ivy.teliax.com/
    email: support@ivy.teliax.com
  license:
    name: MIT License
    url: https://github.com/teliax/ringer-oapi/blob/main/LICENSE
servers:
  - url: http://ivy-web-5.den.teliax.com
    description: Development server
  - url: http://ivy-api.teliax.com
    description: Production server
security:
  - password:
    - read
    - write
  - client_credentials:
    - read
    - write
tags:
  - name: Authentication
    description: |-
      To authenticate the client applications IVY API uses OAtuh 2.0. The Grant Flow that are allowed are:
        - password
        - client_credentials
      OAuth 2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Google, Facebook and GitHub.OAuth 2 provides authorization flows for web and desktop applications, and mobile devices. The \`client_id\` and \`client_secret\` carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth. IVY API follows https://tools.ietf.org/html/rfc6749 RFC.
      P.S. The authentication using the \`grant_flow\` - \`client_credentials\` is used only in sepcial cases and is controlled by the System Administrator.
  - name: Sign Up
    description: |-
      To use the IVY system the Customers could directly register with the system. Customers can register with their basic information like:
        Company Name
        Contact Information like:
          Email
          Street Address
          Country
          City
          State/Province
          Postal Code
          Contact Number
  - name: Confirmation
    description: Once a Customer registers or is added to the IVY Platform the user of the account needs to confirmed before their account becomes operational. After registration the confirmation_token can be passed on to the customer. Once the account is confirmed through the account becomes operational.
  - name: Forgot Password
    description: "To sign in the user needs to supply the username and password. If the user forgets their password they can reset their password. To reset the password the user can supply their email and the API emails a password reset link. One can simply use the password reset link in their email to change their password. Otherwise, one can grab the token from the url and submit it in the PUT route."
  - name: Users
    description: |-
      Users are the people who interact with the IVY system. Users have predefined roles with different permissions.
      Administrators can
        Access billing information
        Request payouts
        Add or change price decks and plans
        Manage users
      Users can
        View account activity
        View existing price decks
  - name: Statements
    description: "You can view your account statements (receipts) here. Statements are generated at the end of your previous service interval (e.g., 2014-11-25 to 2014-12-25)."
  - name: Plans
    description: |-
      All accounts have a plan, even if it's just the default "tryout" plan. Your plan, included packages, add-on packages, usage, and monthly pricing are displayed here. Plans are made up of included and optional packages. The price you set on a plan will cover all included packages. Optional packages can be added or removed at any time and each optional package has its own cost, separate from the plan price.
      Plans usually provide you with additional calling features or calling minute usage for a lower price than what you would pay individually. Since plans allow a certain amount of features or minutes to be used during your billing cycle you should analyze your usage and select a plan that best suits your needs. In some cases it could make more sense to use your account without a plan and instead be charged the individual rates.
      If you add a new plan at any time in your billing cycle your account will be charged the full amount of the plan. If you're changing a plan, it's best to change it just before the end of your billing cycle.
      Some plans and add-on packages can be removed at any time. Others can only be removed by Customer Support. The resources provided will remain on your account until the next billing cycle. Removing a plan only removes associated resources at the next billing cycle and not the calling features themselves.
  - name: Credit Cards
    description: "Manage credit cards used for account payments."
  - name: Items
    description: "View available items for purchase."
  - name: Packages
    description: "View and manage packages available for your account."
  - name: Payments
    description: "Make and manage payments on your account."
  - name: Phone Numbers
    description: "Manage phone numbers associated with your account."
  - name: Country Codes
    description: "Reference list of country codes."
  - name: Call Records
    description: "View call records and history."
  - name: Call Blocks
    description: "Manage call blocking settings."
  - name: Thin Clients
    description: "Manage thin client configurations."
  - name: Templates
    description: "View and manage templates."
  - name: Timezones
    description: "Reference list of available timezones."
  - name: Sites
    description: "Manage sites associated with your account."

# Reference all path files
paths:
  # OAuth paths
  /oauth/token:
    \$ref: './oauth.yaml#/paths/~1oauth~1token'
  /oauth/revoke:
    \$ref: './oauth.yaml#/paths/~1oauth~1revoke'
  
  # Sign-up paths
  /sign-up:
    \$ref: './sign-up.yaml#/paths/~1sign-up'
  
  # Confirmation paths
  /confirmation:
    \$ref: './confirmation.yaml#/paths/~1confirmation'
  
  # Password paths
  /password:
    \$ref: './password.yaml#/paths/~1password'
  /password/reset:
    \$ref: './password.yaml#/paths/~1password~1reset'
  
  # Account paths
  /account:
    \$ref: './account.yaml#/paths/~1account'
  
  # Addresses paths
  /addresses/{id}:
    \$ref: './addresses.yaml#/paths/~1addresses~1{id}'
  
  # Users paths
  /users:
    \$ref: './users.yaml#/paths/~1users'
  /users/{id}:
    \$ref: './users.yaml#/paths/~1users~1{id}'
  
  # Statements paths
  /statements:
    \$ref: './statements.yaml#/paths/~1statements'
  /statements/{id}:
    \$ref: './statements.yaml#/paths/~1statements~1{id}'
  
  # Credit cards paths
  /credit-cards:
    \$ref: './credit-cards.yaml#/paths/~1credit-cards'
  /credit-cards/{id}:
    \$ref: './credit-cards.yaml#/paths/~1credit-cards~1{id}'
  /credit-cards/{id}/verify:
    \$ref: './credit-cards.yaml#/paths/~1credit-cards~1{id}~1verify'
  
  # Payments paths
  /payments:
    \$ref: './payments.yaml#/paths/~1payments'
  
  # Plans paths
  /plans:
    \$ref: './plans.yaml#/paths/~1plans'
  /plans/{id}:
    \$ref: './plans.yaml#/paths/~1plans~1{id}'
  
  # Items paths
  /items:
    \$ref: './items.yaml#/paths/~1items'
  
  # Packages paths
  /packages:
    \$ref: './packages.yaml#/paths/~1packages'
  
  # Timezones paths
  /timezones:
    \$ref: './timezones.yaml#/paths/~1timezones'
  
  # Country codes paths
  /country-codes:
    \$ref: './country-codes.yaml#/paths/~1country-codes'
  
  # Call records paths
  /call-records:
    \$ref: './call-records.yaml#/paths/~1call-records'
  
  # Thin clients paths
  /thin-clients:
    \$ref: './thin-clients.yaml#/paths/~1thin-clients'
  
  # Phone numbers paths
  /phone-numbers:
    \$ref: './phone-numbers.yaml#/paths/~1phone-numbers'
  
  # Templates paths
  /templates:
    \$ref: './templates.yaml#/paths/~1templates'
  
  # Sites paths
  /sites:
    \$ref: './sites.yaml#/paths/~1sites'
  
  # Call blocks paths
  /call-blocks:
    \$ref: './call-blocks.yaml#/paths/~1call-blocks'

components:
  \$ref: './components.yaml#/components'
EOF

# Process each path file to create clean path-only files
for file in "${FILES[@]}"; do
  echo "Processing $file..."
  file_path="openapi/ringer_business/$file"
  
  # Extract the path name from the file (e.g., /users for users.yaml)
  path_name=$(echo "$file" | sed 's/.yaml//' | sed 's/-/\//g')
  path_name="/$path_name"
  
  # Special cases for paths with IDs or nested paths
  if [[ "$file" == "addresses.yaml" ]]; then
    path_name="/addresses/{id}"
  elif [[ "$file" == "users.yaml" ]]; then
    # Users.yaml has both /users and /users/{id}
    path_name="/users"
  elif [[ "$file" == "statements.yaml" ]]; then
    # Statements.yaml has both /statements and /statements/{id}
    path_name="/statements"
  elif [[ "$file" == "credit-cards.yaml" ]]; then
    # Credit cards has multiple paths
    path_name="/credit-cards"
  elif [[ "$file" == "plans.yaml" ]]; then
    # Plans has multiple paths
    path_name="/plans"
  elif [[ "$file" == "password.yaml" ]]; then
    # Password has /password and /password/reset
    path_name="/password"
  fi

  # Read the original file to extract operations
  original_content=$(cat "$file_path")
  
  # Create a new file with proper structure
  {
    echo "paths:"
    
    # Extract operations based on the path name
    if [[ "$file" == "oauth.yaml" ]]; then
      # Special case for OAuth with multiple paths
      echo "  /oauth/token:"
      grep -A 100 "/oauth/token:" "$file_path" | sed -n '/post:/,/revoke:/p' | sed '$d' | sed 's/^/    /'
      echo "  /oauth/revoke:"
      grep -A 100 "/oauth/revoke:" "$file_path" | sed -n '/post:/,/$/p' | sed 's/^/    /'
    elif [[ "$file" == "users.yaml" ]]; then
      # Users has two paths
      echo "  /users:"
      grep -A 200 "/users:" "$file_path" | sed -n '/get:/,/users/{id}:/p' | sed '$d' | sed 's/^/    /'
      echo "  /users/{id}:"
      grep -A 200 "/users/{id}:" "$file_path" | sed -n '/get:/,/$/p' | sed 's/^/    /'
    elif [[ "$file" == "statements.yaml" ]]; then
      # Statements has two paths
      echo "  /statements:"
      grep -A 100 "/statements:" "$file_path" | sed -n '/get:/,/statements/{id}:/p' | sed '$d' | sed 's/^/    /'
      echo "  /statements/{id}:"
      grep -A 100 "/statements/{id}:" "$file_path" | sed -n '/get:/,/$/p' | sed 's/^/    /'
    elif [[ "$file" == "credit-cards.yaml" ]]; then
      # Credit cards has multiple paths
      echo "  /credit-cards:"
      grep -A 200 "/credit-cards:" "$file_path" | sed -n '/get:/,/credit-cards/{id}:/p' | sed '$d' | sed 's/^/    /'
      echo "  /credit-cards/{id}:"
      grep -A 200 "/credit-cards/{id}:" "$file_path" | sed -n '/get:/,/credit-cards/{id}\/verify:/p' | sed '$d' | sed 's/^/    /'
      echo "  /credit-cards/{id}/verify:"
      grep -A 100 "/credit-cards/{id}/verify:" "$file_path" | sed -n '/patch:/,/$/p' | sed 's/^/    /'
    elif [[ "$file" == "plans.yaml" ]]; then
      # Plans has multiple paths
      echo "  /plans:"
      grep -A 100 "/plans:" "$file_path" | sed -n '/get:/,/plans/{id}:/p' | sed '$d' | sed 's/^/    /'
      echo "  /plans/{id}:"
      grep -A 150 "/plans/{id}:" "$file_path" | sed -n '/post:/,/$/p' | sed 's/^/    /'
    elif [[ "$file" == "password.yaml" ]]; then
      # Password has multiple paths
      echo "  /password:"
      grep -A 100 "/password:" "$file_path" | sed -n '/post:/,/password\/reset:/p' | sed '$d' | sed 's/^/    /'
      echo "  /password/reset:"
      grep -A 100 "/password/reset:" "$file_path" | sed -n '/put:/,/$/p' | sed 's/^/    /'
    else
      # Standard case with a single path
      echo "  $path_name:"
      echo "$original_content" | grep -A 500 "get:" | sed 's/^/    /'
    fi
  } > "$file_path.tmp"
  
  # Replace original file
  mv "$file_path.tmp" "$file_path"
  
  # Fix references
  sed -i '' 's|$ref: "./components.yaml#/schemas/|$ref: "./components.yaml#/components/schemas/|g' "$file_path"
done

# Update the components.yaml file
echo "Updating components.yaml..."
# Extract just the components section
awk '
BEGIN { printing = 0 }
/^components:/ { printing = 1; print "components:"; next }
printing == 1 { print }
' "openapi/ringer_business/components.yaml" > "openapi/ringer_business/components.yaml.tmp"

# Replace original file
mv "openapi/ringer_business/components.yaml.tmp" "openapi/ringer_business/components.yaml"

# Fix internal references
sed -i '' 's|$ref: "#/schemas/|$ref: "#/components/schemas/|g' "openapi/ringer_business/components.yaml"

echo "All files have been updated successfully!" 