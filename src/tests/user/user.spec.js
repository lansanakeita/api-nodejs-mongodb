import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user/user.controller.js';

import User from '../../models/user/user.model.js';
import { userDTO } from '../../models/user/dto/userDTO.js';
import { validationResult } from 'express-validator';

jest.mock('../../models/user/user.model');
jest.mock('express-validator');

describe('User Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.find.mockResolvedValue([{}, {}]);
      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it('should handle error when getting all users', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.find.mockRejectedValue(new Error('An error occurred'));
      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error: An error occurred',
      });
    });
  });

  describe('getUser', () => {
    it('should get a user by id', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockResolvedValue({});
      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userDTO({}));
    });

    it('should handle error when getting a user by id', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockRejectedValue(new Error('An error occurred'));
      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error: An error occurred',
      });
    });
  });
});
