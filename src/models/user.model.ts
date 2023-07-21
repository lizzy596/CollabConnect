import mongoose, { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { toJSON, paginate } from './plugins';
import { roles } from '../config/roles';
import authTypes from '../config/authTypes';
import { IUserDocument, IUserModel } from '../contracts/user.interfaces';


const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      // required: true, TODO: do we need this?
      trim: true,
      minlength: 8,
      validate(value: String) {
        if (!value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/)) {
          throw new Error('Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long');
        }
      },
      
      private: true, // used by the toJSON plugin
    },
    authType: {
      type: String,
      required: true,
      enum: authTypes,
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Return paths to text search in paginate plugin
 * @returns {Array<string>}
 */

userSchema.static('searchableFields', function searchableFields(): string[] {
  return ['firstName', 'lastName', 'email'];
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

userSchema.static(
  'isEmailTaken',
  async function isEmailTaken(email: string, excludeUserId: mongoose.Types.ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.method('isPasswordMatch', async function isPasswordMatch(password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

userSchema.pre('save', async function (next) {
  const user = this;
  if(user.password) {
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
}
  next();
});

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
