"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validations_1 = require("../../validations");
const controllers_1 = require("../../controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(validations_1.authValidation.register), controllers_1.authController.register);
router.post('/login/google', (0, validate_1.default)(validations_1.authValidation.oauthLogin), controllers_1.authController.loginGoogle);
router.post('/login/apple', (0, validate_1.default)(validations_1.authValidation.oauthLogin), controllers_1.authController.loginApple);
router.post('/login/email', (0, validate_1.default)(validations_1.authValidation.login), controllers_1.authController.loginEmail);
router.post('/logout', (0, validate_1.default)(validations_1.authValidation.logout), controllers_1.authController.logout);
router.post('/refresh-tokens', (0, validate_1.default)(validations_1.authValidation.refreshTokens), controllers_1.authController.refreshTokens);
router.post('/forgot-password', (0, validate_1.default)(validations_1.authValidation.forgotPassword), controllers_1.authController.forgotPassword);
router.post('/reset-password', (0, validate_1.default)(validations_1.authValidation.resetPassword), controllers_1.authController.resetPassword);
router.post('/send-verification-email', (0, auth_1.default)(), controllers_1.authController.sendVerificationEmail);
router.post('/verify-email', (0, validate_1.default)(validations_1.authValidation.verifyEmail), controllers_1.authController.verifyEmail);
exports.default = router;
