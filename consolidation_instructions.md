You're right, generating 85 SDKs is definitely not ideal! The goal of having one comprehensive SDK is a good one.

The **`$ref` and bundling approach** I mentioned earlier is precisely suited for your situation. It allows you to maintain your organized, multi-file structure for development and then produce a single, consolidated OpenAPI specification file that OpenAPI Generator can use to build one SDK.

Here's how you can adapt this to your current directory structure:

**The Strategy: Create a Root OpenAPI File and Use a Bundler**

1.  **Create a Root `openapi.yaml` File:**
    This file will be the main entry point for your entire API definition. It will define the overall `info`, `servers`, and then use `$ref` to pull in `paths` and `components` from all your other 85+ files.

    Place this root `openapi.yaml` at the top level of your documentation directory (the same level as `account.yaml`, `sites/`, `common_components.yaml`, etc.).

2.  **Structure Your Root `openapi.yaml`:**

    ```yaml
    # openapi.yaml (your new root file)
    openapi: 3.0.3
    info:
      title: Your Consolidated API Title
      version: v1.0.0 # Or your current API version
      description: The complete API for your service.
      # Add contact, license, etc. as needed
    servers:
      - url: https://api.yourdomain.com/v1 # Your primary API server
      # Add other servers if necessary (e.g., staging, sandbox)

    tags:
      # You can define tags here, or they can be defined in the individual files
      # and will be collected by the bundler.
      # It's often cleaner to define them where the paths using them are defined.
      # Example:
      # - name: Accounts
      #   description: Operations related to user accounts.
      # - name: SitesAndDevices
      #   description: Manage sites and their associated devices.

    paths:
      # References to paths in your top-level files
      # Note: The part after #/paths/ must be URI encoded if it contains '/', '~', etc.
      # For example, /accounts becomes ~1accounts
      /account:
        $ref: './account.yaml#/paths/~1account'
      /addresses:
        $ref: './addresses.yaml#/paths/~1addresses'
      # ... and so on for all paths defined in account.yaml, addresses.yaml etc.

      # Example for a file that might define multiple related paths:
      # If 'payments.yaml' defines '/payments' and '/payments/{id}'
      /payments:
        $ref: './payments.yaml#/paths/~1payments'
      /payments/{paymentId}:
        $ref: './payments.yaml#/paths/~1payments~1{paymentId}'

      # References to paths in your nested 'sites' directory
      # Assuming sites/call-blocks/call-block.yaml defines /sites/{siteId}/call-blocks/{callBlockId}
      /sites/{siteId}/call-blocks/{callBlockId}:
        $ref: './sites/call-blocks/call-block.yaml#/paths/~1sites~1{siteId}~1call-blocks~1{callBlockId}'

      # If sites/call-blocks/index.yaml defines /sites/{siteId}/call-blocks
      /sites/{siteId}/call-blocks:
        $ref: './sites/call-blocks/index.yaml#/paths/~1sites~1{siteId}~1call-blocks'

      # ... continue this pattern for ALL paths in ALL your files

    components:
      schemas:
        # Reference all schemas from common_components.yaml
        # If common_components.yaml has "SomeSharedSchema":
        SomeSharedSchema:
          $ref: './common_components.yaml#/components/schemas/SomeSharedSchema'
        AnotherSharedSchema:
          $ref: './common_components.yaml#/components/schemas/AnotherSharedSchema'
        # ... for all schemas in common_components.yaml

        # If individual files also define their own non-shared schemas,
        # you can reference them too, but it's better if most are in common_components
        # or clearly namespaced if local to a resource.
        # AccountSpecificSchema:
        #   $ref: './account.yaml#/components/schemas/AccountSpecificSchema'

      parameters:
        CommonSiteIdParam:
          $ref: './common_components.yaml#/components/parameters/CommonSiteIdParam'
        # ... for all common parameters

      responses:
        StandardErrorResponse:
          $ref: './common_components.yaml#/components/responses/StandardErrorResponse'
        # ... for all common responses

      securitySchemes:
        OAuth2:
          $ref: './oauth.yaml#/components/securitySchemes/OAuth2' # If oauth.yaml defines it
        # Or directly define here if it's central:
        # ApiKeyAuth:
        #   type: apiKey
        #   in: header
        #   name: X-API-KEY

    security: # Optional: Define global security requirements
      - OAuth2: [scope1, scope2] # Example
      # - ApiKeyAuth: []
    ```

3.  **Ensure Your Individual Files are "Referenceable":**
    Each of your existing YAML files (`account.yaml`, `sites/call-blocks/call-block.yaml`, etc.) must structure its content so it can be referenced.

    *   **Paths:** All endpoint definitions should be under a top-level `paths:` key in that file.
        *Example: `account.yaml`*
        ```yaml
        # account.yaml
        # Optional: tags specific to these paths can be defined here
        # tags:
        #   - name: Account
        #     description: User account operations.
        paths:
          /account:
            get:
              summary: Get current user account
              operationId: getAccount # CRITICAL for SDK generation - make unique & descriptive
              tags: ["Account"] # Tag for grouping in SDK
              responses:
                '200':
                  description: Account details
                  content:
                    application/json:
                      schema:
                        $ref: './common_components.yaml#/components/schemas/AccountSchema' # Path relative to THIS file
          /account/profile:
            put:
              summary: Update account profile
              operationId: updateAccountProfile
              tags: ["Account"]
              requestBody:
                content:
                  application/json:
                    schema:
                      $ref: './common_components.yaml#/components/schemas/ProfileUpdateSchema'
              responses:
                '200':
                  description: Profile updated
                  content:
                    application/json:
                      schema:
                        $ref: './common_components.yaml#/components/schemas/AccountSchema'

        # Optional: components specific to account.yaml (less common if you have common_components.yaml)
        # components:
        #   schemas:
        #     AccountSpecificInternalSchema:
        #       type: object
        #       properties: # ...
        ```

    *   **Components:** `common_components.yaml` should have all its definitions under a top-level `components:` key (e.g., `components/schemas/MySchema`, `components/parameters/MyParam`).
        *Example: `common_components.yaml`*
        ```yaml
        # common_components.yaml
        components:
          schemas:
            AccountSchema:
              type: object
              properties:
                id: { type: string, format: uuid }
                email: { type: string, format: email }
                # ...
            ProfileUpdateSchema:
              type: object
              properties:
                displayName: { type: string }
                # ...
            ErrorModel:
              type: object
              properties:
                code: { type: string }
                message: { type: string }
          parameters:
            SiteIdPathParameter:
              name: siteId
              in: path
              required: true
              description: Identifier of the site.
              schema:
                type: string
                format: uuid
          responses:
            NotFoundResponse:
              description: The requested resource was not found.
              content:
                application/json:
                  schema:
                    $ref: '#/components/schemas/ErrorModel' # Internal ref within this file
            UnauthorizedResponse:
              description: Unauthorized access.
              content:
                application/json:
                  schema:
                    $ref: '#/components/schemas/ErrorModel'
        ```

4.  **What about your `index.yaml` files (e.g., `sites/call-blocks/index.yaml`)?**
    These can be very useful! They can act as intermediate aggregators.
    *   Your root `openapi.yaml` can `$ref` paths from `sites/call-blocks/index.yaml`.
    *   Then, `sites/call-blocks/index.yaml` can, in turn, `$ref` paths from `call-block.yaml` or other files within that specific subdirectory. This creates a manageable hierarchy.

    *Example: `sites/call-blocks/index.yaml`*
    ```yaml
    # sites/call-blocks/index.yaml
    paths:
      /sites/{siteId}/call-blocks: # The list/create endpoint for call-blocks
        get:
          summary: List call blocks for a site
          operationId: listSiteCallBlocks
          tags: ["SiteCallBlocks"]
          parameters:
            - $ref: '../../../common_components.yaml#/components/parameters/SiteIdPathParameter' # Relative path up to common_components
          responses:
            '200':
              description: A list of call blocks.
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      $ref: './call-block.yaml#/components/schemas/CallBlockSchema' # Assuming CallBlockSchema is defined in call-block.yaml
                                                                                    # or in common_components.yaml
        post:
          summary: Create a new call block for a site
          operationId: createSiteCallBlock
          # ... more details
      # You might also reference more specific paths from other files in this directory
      # For example, if call-block.yaml defines the /sites/{siteId}/call-blocks/{callBlockId} path:
      /sites/{siteId}/call-blocks/{id}: # Note: a different path parameter name to avoid conflict if {callBlockId} is also used
         $ref: './call-block.yaml#/paths/~1sites~1{siteId}~1call-blocks~1{id}' # Path to the actual definition
    ```
    Ensure that the `call-block.yaml` also defines its components correctly if referenced, e.g.:
    ```yaml
    # sites/call-blocks/call-block.yaml
    paths:
      /sites/{siteId}/call-blocks/{id}:
        get:
          summary: Get a specific call block
          operationId: getSiteCallBlockById
          # ...
    components:
      schemas:
        CallBlockSchema:
          type: object
          properties:
            # ... definition of a call block
    ```

5.  **Bundling the Specification:**
    Once your root `openapi.yaml` and all referenced files are set up, use a bundler tool. Redocly CLI is highly recommended for this:
    *   Install it: `npm install -g @redocly/cli`
    *   Bundle your API:
        ```bash
        redocly bundle openapi.yaml -o openapi_bundled.yaml
        ```
    This command will read `openapi.yaml`, resolve all local `$ref`s, and create a single `openapi_bundled.yaml` file.

6.  **Generate Your SDK:**
    Now, use OpenAPI Generator with the `openapi_bundled.yaml` file:
    ```bash
    openapi-generator-cli generate -i openapi_bundled.yaml -g <your_language> -o ./my-sdk --additional-properties=packageName=MySdkClient
    ```
    This will generate **one SDK** based on your entire API surface.

**Key Considerations for SDK Generation:**

*   **`operationId`:** Ensure every operation (GET, POST, PUT, etc.) in your YAML files has a unique and descriptive `operationId`. OpenAPI Generator typically uses these to name the methods in your SDK. Duplicates will cause errors or unpredictable SDK method names.
*   **`tags`:** OpenAPI Generator often uses tags to group operations into different API classes (e.g., `UsersApi`, `SitesApi`). Define and use tags consistently across your files. Tags defined in individual files will be collected by the bundler.
*   **Schema Naming:** Make sure your schema names (in `components/schemas`) are unique across your entire API, or are appropriately namespaced if necessary (though global uniqueness is simpler for a single SDK). Your `common_components.yaml` helps a lot here.
*   **Relative Paths in `$ref`:** Paths in `$ref` are relative to the file containing the `$ref` itself. This is important when referencing `common_components.yaml` from nested files.

**Advantages of this Approach:**

*   **Maintainability:** You keep your 85+ files, which are easier to navigate and manage.
*   **Collaboration:** Easier for teams to work on different parts of the API simultaneously.
*   **Single SDK:** You achieve your goal of generating one comprehensive SDK.
*   **Standard Compliance:** This is the standard and recommended way to handle large OpenAPI definitions.

This refactoring will take some effort to set up the root file and ensure all `$ref`s are correct, but it's a one-time setup that will pay off significantly in the long run. Start with a few files, get the bundling working, and then incrementally add more.

You can use `redocly lint` to validate your specifications as you go, which helps catch issues early.