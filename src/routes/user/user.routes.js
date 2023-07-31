import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user/user.controller.js';

import { authorize } from '../../guards/auth.guard.js';
import { body } from 'express-validator';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - User
 *     description: Get all users
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
 *                     description: The user ID.
 *                     example: 1
 *                   userName:
 *                     type: string
 *                     description: The user surname.
 *                     example: 'Jackson 5'
 *                   firstName:
 *                     type: string
 *                     description: The user firstname.
 *                     example: 'Fati'
 *                   lastName:
 *                     type: string
 *                     description: The user lastname.
 *                     example: 'Ansumane'
 *                   email:
 *                     type: string
 *                     description: The user email.
 *                     example: 'f.ansu@masia.es'
 *                   password:
 *                     type: string
 *                     description: The user hashed password.
 *                     example: 'fhsshfjehjsnuhqejfghqwjsdngjs'
 *                   arrivedAt:
 *                     type: Date
 *                     description: The user's date subscription.
 *                     example: '2023-06-24T22:37:45.322Z'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *
 */

router.get('/users', authorize, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user
 *     tags:
 *      - User
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user that we want to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 userName:
 *                   type: string
 *                   description: The user username.
 *                   example: 'Jackson 5'
 *                 firstName:
 *                   type: string
 *                   description: The user firstname.
 *                   example: 'Fati'
 *                 lastName:
 *                   type: string
 *                   description: The user lastname.
 *                   example: 'Ansumane'
 *                 email:
 *                   type: string
 *                   description: The user email.
 *                   example: 'f.ansu@masia.es'
 *                 password:
 *                   type: string
 *                   description: The user hashed password.
 *                   example: 'fhsshfjehjsnuhqejfghqwjsdngjs'
 *                 arrivedAt:
 *                   type: Date
 *                   description: The user's date subscription.
 *                   example: '2023-06-24T22:37:45.322Z'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */

router.get('/users/:id', getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *      - User
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user that we want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               arrivedAt:
 *                 type: Date
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */

router.put('/users/:id', authorize, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *      - User
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */

router.delete('/users/:id', authorize, deleteUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create a user
 *     tags:
 *      - User
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */

router.post(
  '/users',
  [
    body('userName').notEmpty().withMessage('User name is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 5 characters'),
  ],
  createUser
);

export default router;
