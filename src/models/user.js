import { Schema, mongoose } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'User must have a firstname'],
  },
  lastName: {
    type: String,
    required: [true, 'User must have a lastname'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
  },
  arrivedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);
export default User;
