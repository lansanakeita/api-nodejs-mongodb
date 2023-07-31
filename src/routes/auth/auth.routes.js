import { login, me, register } from '../../controllers/auth/auth.controller.js';

import { authorize } from '../../guards/auth.guard.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Retrieve profile of the current logged-in user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/profile/me', authorize, me);

export default router;
