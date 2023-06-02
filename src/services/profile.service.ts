import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IProfile } from '../contracts/profile.interfaces';
import { IPaginateOptions, IQueryResult } from '../contracts/paginate.interfaces';
import { Profile } from '../models';
import ApiError from '../utils/ApiError';

const createProfile = async (profileBody: IProfile ): Promise<IProfile> => {
 return Profile.create(profileBody);
};






export const profileService = {
  createProfile,
 
};