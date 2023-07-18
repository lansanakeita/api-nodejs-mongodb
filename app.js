import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import swaggerDocs from './src/utils/swagger.js';
import swaggerUI from 'swagger-ui-express';
import userRoutes from './src/routes/user/userRoutes.js';
import ProductRoutes from './src/routes/product/productRoutes.js';
import OrderRoutes from './src/routes/order/orderRoutes.js';

const app = express();

/**
 * @ express.json()
 * middleware qui parse automatiquement le corps des requêtes entrantes au format JSON.
 *  afin d'accéder à des objets JSON envoyés avec les requêtes via req.body dans vos gestionnaires de routes.
 */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('combined'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(userRoutes);
app.use(ProductRoutes);
app.use(OrderRoutes);

export default app;
