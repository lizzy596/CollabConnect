import Joi from 'joi';
import { password, objectId } from './custom.validation';

const createProfile = {
  body: Joi.object().keys({
    bio: Joi.string(),
    interests: Joi.string(),
    avatar: Joi.string(),
    skills: Joi.string(),
    location: Joi.string(),
    user: Joi.string()
  }),
};

// const getUsers = {
//   query: Joi.object().keys({
//     firstName: Joi.string(),
//     lastName: Joi.string(),
//     role: Joi.string(),
//     search: Joi.string().allow(''),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

//  const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

//  const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       firstName: Joi.string(),
//       lastName: Joi.string(),
//     })
//     .min(1),
// };

// const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };


export const profileValidation = { createProfile }