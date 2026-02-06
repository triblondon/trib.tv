export const jsonPathSample = {
  openapi: "3.1.0",
  servers: [{ url: "https://api.example.com" }],
  paths: {
    "/foo": {
      parameters: [{ name: "fooId", in: "path", required: true }],
      get: {
        operationId: "getFoo",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" }
                }
              }
            }
          }
        }
      },
      post: {
        operationId: "postFoo",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" }
                }
              }
            }
          }
        }
      },
      delete: {
        operationId: "deleteFoo",
        requestBody: {
          content: {
            "application/json": {
              example: {
                endUserAddresses: {
                  post: true
                }
              }
            }
          }
        }
      }
    },
    "/bar": {
      parameters: [{ name: "barId", in: "path", required: true }],
      put: {
        operationId: "putBar",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" }
                }
              }
            }
          }
        }
      },
      get: {
        operationId: "getBar"
      }
    }
  }
};
