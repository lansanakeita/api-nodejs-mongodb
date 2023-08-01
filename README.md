# api-nodejs-mongodb

## Installation des dépendences

> ```bash
> yarn install
> ```

## Lancer l'API

> ```bash
> yarn start
> ```

> **Une fois la commande exécutée l'api se lance sur l'adresse [http://localhost:3200](http://localhost:3200).**

## Documentation API

**L'API étant lancé une swagger doc est disponible à l'adresse [http://localhost:3200/api-docs](http://localhost:3200/api-docs)**

## API Routes

> ### Auth

- `POST /api/auth/register` pour créer un compte

- `POST /api/auth/login` pour s'authentifier

**Une fois qu'on est authentifier on obtient la réponse suivante**

```javascript
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzdmZDZiN2VkYzVjZjc5YWY5ZDFkZSIsImlhdCI6MTY5MDgzMTIyNywiZXhwIjoxNjkwOTE3NjI3fQ.BngyPa_WIRPbqUKNOa2AI9hoC9qOndo_vRa5brzEtXc"
}
```

Pour accéder aux autres routes de l'api il faudra copier le token et dans le postman, cliquer sur l'onglet `Authorization` et selectionnez le type `Bearer Token` puis coller le token à l'endroit approprié.

> ### User

- `PUT /api/users/{id}` mettre à jour les informations d'un utilisateur spécifique
- `DELETE /api/users/{id}` supprimer un utilisateur spécifique

> ### Product

- `POST /api/product` créer un produit

- `GET /api/products` récupérer l'ensemble des produits

- `GET /api/product/{id}` récupérer un produit spécifique
- `PUT /api/product/{id}` mettre à jour les informations d'un produit spécifique
- `DELETE /api/product/{id}` supprimer un produit spécifique

> ### Order

- `POST /api/order` créer une commande

- `GET /api/orders` récupérer l'ensemble des commandes

- `GET /api/order/{id}` récupérer une commande spécifique
- `PUT /api/order/{id}` mettre à jour les informations d'une commande spécifique
- `DELETE /api/order/{id}` supprimer une commande spécifique
