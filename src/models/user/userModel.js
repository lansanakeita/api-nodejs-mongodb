import { Schema, mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 8);
});
const User = mongoose.model('User', userSchema);
export default User;
