import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { workspaceService } from '../services/workspace.service'; 

const test = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.CREATED).send();
});

export const workspaceController = {
  test
};
