import User from '../../models/user/user.model.js';
import bcrypt from 'bcryptjs';
import { createUser } from '../user/user.controller.js';
import dotenv from 'dotenv';
import get from 'lodash/get.js';
import includes from 'lodash/includes.js';
import jwt from 'jsonwebtoken';
import logger from '../../utils/logger.js';
import { userDTO } from '../../models/user/dto/userDTO.js';

dotenv.config();

export async function register(req, res, next) {
  try {
    await createUser(req, res, next);
    logger.info('User registered successfully');
  } catch (err) {
    logger.error('There was a problem registering the user:', err);
    return res.status(500).send('There was a problem registering the user.');
  }
}

export async function login(req, res) {
  try {
    const user = await (async () => {
      const loginField = get(req.body, 'username');
      logger.info(`Attempting login with field: ${loginField}`);
      if (includes(loginField, '@')) {
        const email = get(req.body, 'username');
        const getUserByHisEmail = await User.findOne({ email });
        return getUserByHisEmail;
      }
      const userName = get(req.body, 'username');
      const getUserByHisUsername = await User.findOne({ userName });
      return getUserByHisUsername;
    })();

    if (!user) {
      return res.status(404).send('No user found.');
    }

    const password = get(req.body, 'password');
    const userHashPassword = get(user, 'password');
    const passwordIsValid = bcrypt.compareSync(password, userHashPassword);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.header('access_token', token);

    return res.status(200).send({ auth: true, token });
  } catch (err) {
    logger.error('There was a problem logging in:', err);
    return res.status(500).send('There was a problem logging in.');
  }
}

export async function me(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  logger.info('Headers value:', req.headers);

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    const id = get(decoded, 'id');
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send('No user found.');
    }

    return res.status(200).send(userDTO(user));
  });
}
