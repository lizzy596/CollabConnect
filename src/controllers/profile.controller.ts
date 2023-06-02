import { Request, Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import { profileService } from '../services/profile.service';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';


const createProfile = catchAsync(async (req: Request, res: Response) => {
  const profile = await profileService.createProfile(req.body);
  res.status(httpStatus.CREATED).send(profile);
});


export const profileController = { createProfile};