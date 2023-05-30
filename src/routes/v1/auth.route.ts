import express, { Router } from 'express';
import validate from '../../middlewares/validate';
import { authValidation } from '../../validations';
import { authController } from '../../controllers';
import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login/google', validate(authValidation.oauthLogin), authController.loginGoogle);
//router.post('/login/apple', validate(authValidation.oauthLogin), authController.loginApple);
router.post('/login/email', validate(authValidation.login), authController.loginEmail);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
//router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
//router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
//router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
//router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;