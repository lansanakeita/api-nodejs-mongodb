import swaggerJsdoc from 'swagger-jsdoc';
import { glob } from 'glob';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API REST WITH EXPRESS AND MONGODB',
    version: '1.0.0',
    description: 'Une simple API avec Express et MongoDB',
  },
};

const options = {
  swaggerDefinition,
  servers: [
    {
      url: 'http://localhost:3200',
    },
  ],
  apis: glob.sync('src/routes/**/*.js', { absolute: true }),
};

const swaggerDocs = swaggerJsdoc(options);
export default swaggerDocs;
