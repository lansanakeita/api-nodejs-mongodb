import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API WITH EXPRESS AND MONGODB',
    version: '1.0.0',
    description: 'Une simple API avec Express et MongoDB',
  },
};

const options = {
  swaggerDefinition,
  servers: [
    {
      url: 'http://localhost:3020',
    },
  ],
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsdoc(options);
export default swaggerDocs;
