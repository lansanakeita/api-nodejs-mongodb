import express from 'express';
import swaggerDocs from './src/utils/swagger.js';
import swaggerUI from 'swagger-ui-express';

const app = express();

/**
 * @ express.json()
 * middleware qui parse automatiquement le corps des requêtes entrantes au format JSON.
 *  afin d'accéder à des objets JSON envoyés avec les requêtes via req.body dans vos gestionnaires de routes.
 */
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The book ID.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The book title.
 *                     example: 'Harry Potter'
 *
 */

app.get('/books', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'Harry Potter',
    },
  ]);
});

/**
 * @swagger
 * /books:
 *   post:
 *     description: Get all books
 *     parameters:
 *      - name: title
 *        description: title of the book
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/books', (req, res) => {
  res.status(201).send();
});

export default app;