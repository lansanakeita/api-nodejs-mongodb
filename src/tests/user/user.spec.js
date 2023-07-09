import request from 'supertest';
import app from '../../app';
import User from '../../models/user';
import { after } from 'lodash';

describe('User Controller', () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {});

  describe('GET /users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
