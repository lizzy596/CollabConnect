import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import moment from 'moment';
import httpStatus from 'http-status';
import {config} from '../config/config';
import {userService} from '../services';
import { Token } from '../models';
import ApiError from '../utils/ApiError';
import { tokenTypes } from '../config/tokens';
import { IAccessAndRefreshTokens, IToken, ITokenDocument } from '../contracts/token.interfaces';
import { IUserDocument } from '../contracts/user.interfaces';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId: mongoose.Types.ObjectId, expires: moment.Moment, type: string, secret = config.jwt.secret): string =>  {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token: string, userId: mongoose.Types.ObjectId, expires: moment.Moment, type: string, blacklisted = false): Promise<ITokenDocument> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};


/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: string): Promise<ITokenDocument> => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
  }
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: IUserDocument ): Promise<IAccessAndRefreshTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user._id.toString(), accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};
/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: IUserDocument): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user._id.toString(), expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user._id.toString(), expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

const clearUserTokens = async (userId: string) => {
  await Token.deleteMany({ user: userId });
};

const deleteTokenById = (id: mongoose.Types.ObjectId) => {
  return Token.findByIdAndDelete(id);
};

export const tokenService =  {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  clearUserTokens,
  deleteTokenById
};