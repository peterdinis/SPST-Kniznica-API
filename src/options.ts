export const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "SPŠT API",
        version: "0.1.0",
        description:
          "Api Dokumentácia k projektu školskej knižnice",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.ts"],
  };