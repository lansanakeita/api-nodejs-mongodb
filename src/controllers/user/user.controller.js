import User from '../../models/user/user.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';
import logger from '../../utils/logger.js';
import map from 'lodash/map.js';
import { userDTO } from '../../models/user/dto/userDTO.js';
import { validationResult } from 'express-validator';

/**
 * Récupère tous les utilisateurs.
 *
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    const usersDTO = map(users, userDTO);
    res.status(200).json(usersDTO);
    logger.info('Successfully fetched all users');
  } catch (error) {
    logger.error(`Error getting users: ${error.toString()}`);
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Récupère un utilisateur spécifique par son identifiant.
 *
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
export async function getUser(req, res) {
  const id = get(req.params, 'id');
  try {
    const user = await User.findById(id);
    if (isNull(user) || isUndefined(user)) {
      res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDTO(user));
  } catch (error) {
    logger.error(`Error getting user with id ${id}: ${error.toString()}`);
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Crée un nouvel utilisateur.
 *
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
export async function createUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Validation failed, entered data is incorrect.');
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array(),
    });
  }

  try {
    const existingUser = await User.findOne({ userName: req.body.userName });
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingUser) {
      logger.warn('User name already in use.');
      return res.status(400).json({ error: 'User name already in use.' });
    }

    if (existingEmail) {
      logger.warn('Email already in use.');
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const user = new User(req.body);
    await user
      .save()
      .then((result) => {
        logger.info('User created successfully!');
        return res.status(201).json({
          message: 'User created successfully!',
          user: result,
        });
      })
      .catch((err) => {
        logger.error(`Error creating user: ${err.toString()}`);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    logger.error(`Error processing request: ${error.toString()}`);
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Met à jour les informations d'un utilisateur spécifique.
 *
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
export async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed, updated data is incorrect.');
    return res.status(422).json({
      message: 'Validation failed, updated data is incorrect.',
      errors: errors.array(),
    });
  }

  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      logger.warn(`User not found for ID: ${id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    if (updatedInfo.includes('userName')) {
      const userName = get(req, 'body.userName');
      const existingUser = await User.findOne({
        userName,
        _id: { $ne: id },
      });
      if (existingUser) {
        logger.warn('User name already in use.');
        return res.status(400).json({ error: 'User name already in use.' });
      }
    }

    if (updatedInfo.includes('email')) {
      const existingEmail = await User.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existingEmail) {
        logger.warn('Email already in use.');
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    logger.info(`User with ID: ${id} updated successfully!`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error updating user with ID: ${id}: ${error.toString()}`);
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Supprime un utilisateur spécifique.
 *
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
export async function deleteUser(req, res) {
  try {
    const id = get(req.params, 'id');
    const user = await User.findByIdAndRemove(id);
    if (isNull(user) || isUndefined(user)) {
      logger.warn(`User not found for ID: ${id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User with ID: ${id} deleted successfully!`);
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    logger.error(`Error deleting user with ID: ${id}: ${error.toString()}`);
    return res.status(400).json({ error: error.toString() });
  }
}
