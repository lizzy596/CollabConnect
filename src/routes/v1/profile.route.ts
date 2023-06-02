import express, { Router } from 'express';
import validate from '../../middlewares/validate';
import { profileValidation } from '../../validations';
import { profileController } from '../../controllers';
import auth from '../../middlewares/auth';


const router: Router = express.Router();

router.post('/profile', validate(profileValidation.createProfile), profileController.createProfile);

export default router;