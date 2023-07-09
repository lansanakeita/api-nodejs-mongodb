import User from '../../models/user/userModel.js';
import get from 'lodash/get.js';
import isEmpty from 'lodash/isEmpty.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';
import { validationResult } from 'express-validator';

/**
 * récupération de l'ensemble des utilisateurs
 */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * récupération d'un utilisateur
 */
export async function getUser(req, res, next) {
  const id = get(req.params, 'id');
  try {
    const user = await User.findById(id);
    if (isNull(user) || isUndefined(user)) {
      res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {}
}

/**
 * création d'un utilisateur
 */
export async function createUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array(),
    });
  }

  try {
    const existingUser = await User.findOne({ userName: req.body.userName });
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'User name already in use.' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const user = new User(req.body);
    await user
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'User created successfully!',
          user: result,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * mise à jour des informations d'un utilisateur
 */
export async function updateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
      return res.status(404).json({ error: 'User not found' });
    }

    if (updatedInfo.includes('userName')) {
      const existingUser = await User.findOne({
        userName: req.body.userName,
        _id: { $ne: id },
      });
      if (existingUser) {
        return res.status(400).json({ error: 'User name already in use.' });
      }
    }

    if (updatedInfo.includes('email')) {
      const existingEmail = await User.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = get(req.params, 'id');
    const user = await User.findByIdAndRemove(id);
    if (isNull(user) || isUndefined(user)) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}
