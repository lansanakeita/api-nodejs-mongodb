import bodyParser from 'body-parser';
import express from 'express';
import loadRoutes from './src/utils/routes.loader.js';
import logger from './src/utils/logger.js';
import morgan from 'morgan';
import path from 'path';
import swaggerDocs from './src/utils/swagger.js';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('combined'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

await loadRoutes(path.resolve('./src/routes'), app);

app.use('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

// Gestionnaire d'erreur global
app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, err);
  res.status(500).send({ error: 'An unexpected error occurred!' });
});

export default app;
