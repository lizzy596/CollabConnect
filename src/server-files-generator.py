# 1. Bring in variables (example: 'profile')
# 2. Create service
# 3. Create controller (wtih path to service in imports)
# 4. Create route with path to controller

# NOTE: Run from root directory

# python server-files-generator.py 'profile'

import sys
import os

# Create service
print("Creating Files...")

def create_file(directory, filename, type):
    with open(directory + '/' + filename + '.' + type  + '.ts', "w") as f:
        f.write("")

def append_file(path, text):
    with open(path, "a") as f:
        f.write(text)
        f.close()

filename = ""

if __name__ == "__main__":
  filename = input("Enter the name of the file to create: ")

# Create Service
create_file('services', filename, 'service')

serviceExport = "\nexport { %sService } from './%s.service'" % (filename, filename)
append_file('services/index.ts', serviceExport)
append_file('services/%s.service.ts' % (filename), 
"""const test = async () => {
  return
};

export const %sService = {
  test
};
""" % (filename) )

# Controllers
create_file('controllers', filename, 'controller')

controllerExport = "\nexport { %sController } from './%s.controller'" % (filename, filename)
append_file('controllers/index.ts', controllerExport)
append_file('controllers/%s.controller.ts' % (filename), 
"""import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { %sService } from '../services/%s.service'; 

const test = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.CREATED).send();
});

export const %sController = {
  test
};
""" % (filename, filename, filename))

# Routes
create_file('routes/v1', filename, 'route')

#routeExport = "\nexport { %sRoute } from './v1/%s.route'" % (filename, filename)
routeExport = "\nimport  %sRoute from './%s.route'" % (filename, filename)

with open('routes/v1/index.ts') as f:
    read_data = f.read()
with open('routes/v1/index.ts', 'w') as f:
    f.write(routeExport + read_data)




#append_file('routes/v1/index.ts', routeExport)
append_file('routes/v1/%s.route.ts' % (filename), 
"""import express, { Router } from 'express';
import validate from '../../middlewares/validate';
import auth from '../../middlewares/auth';

const router: Router = express.Router();

// router.post('/path')

export default router;
""")

# Validations
create_file('validations', filename, 'validation')

valExport = "\nexport * from './%s.validation'" % (filename)
append_file('validations/index.ts', valExport)
append_file('validations/%s.validation.ts' % (filename), 
"""import Joi from 'joi';

export const %sValidation = {}
""" % (filename))





