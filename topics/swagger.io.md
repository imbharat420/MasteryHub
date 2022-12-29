Here is an example of a simple OpenAPI specification file that defines a simple "Hello World" API using Swagger:

Copy code

```yml
openapi: 3.0.0
info:
  title: Hello World API
  version: 1.0.0
  description: A simple API for saying hello
  termsOfService: https://example.com/terms
  contact:
    name: John Doe
    email: john@example.com
    url: https://example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
servers:
  - url: https://api.example.com/v1
paths:
  /hello:
    get:
      summary: Say hello
      operationId: hello
      responses:
        "200":
          description: A greeting
          content:
            text/plain:
              schema:
                type: string
                example: "Hello, world!"
```

This OpenAPI specification defines a single endpoint, `/hello`, that returns a plain text response with the greeting "Hello, world!". The specification includes metadata about the API, such as its title, version, and contact information, as well as details about the endpoint, including the request and response formats.

Using this OpenAPI specification file, developers can generate documentation, client libraries, and other resources to help them work with the API. For example, they could use the Swagger UI tool to view the API documentation and test the endpoint using the interactive interface.
