// Configuration for  the app to use Swagger
export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Tracky  API',
        version: '1.0.0',
        description: 'Official API documentation for Tracky',
      },
      servers: [
        {
            url: 'http://localhost:3001',
            description: ''
        },
    ],
    },
    apis: ['./app/routes/*.ts'],
  };