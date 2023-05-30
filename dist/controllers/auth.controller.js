"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = require("../config/config");
const services_1 = require("../services");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Object.assign(req.body, { authType: 'email' });
    const user = yield services_1.userService.createUser(req.body);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    res.status(http_status_1.default.CREATED).send({ user, tokens });
}));
const loginEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield services_1.authService.loginUserWithEmailAndPassword(email, password);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    services_1.cookieService.setTokenCookie(res, tokens.refresh);
    res.send({ user, tokens });
}));
const loginGoogle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield services_1.googleService.verifyOAuthToken(req.body.token);
    const tokens = yield services_1.tokenService.generateAuthTokens(user);
    services_1.cookieService.setTokenCookie(res, tokens.refresh);
    res.send({ user, tokens });
}));
// const loginApple = catchAsync(async (req: Request, res: Response) => {
//   const user = await appleService.verifyOAuthToken(req.body.token);
//   const tokens = await tokenService.generateAuthTokens(user);
//   cookieService.setTokenCookie(res, tokens.refresh);
//   res.send({ user, tokens });
// });
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.authService.logout(req.body.refreshToken);
    services_1.cookieService.expireTokenCookie(res);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
const refreshTokens = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, tokens } = yield services_1.authService.refreshAuth(req.cookies[config_1.config.jwt.refreshCookieName] || req.body.refreshToken);
    services_1.cookieService.setTokenCookie(res, tokens.refresh);
    res.send({ user, tokens });
}));
// const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.authService.resetPassword(req.params.token, req.body.password);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
// const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
//   if(!req.user) {
//     throw new Error
//   }
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });
const verifyEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.authService.verifyEmail(req.query.token);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
exports.authController = {
    register,
    loginEmail,
    //loginApple,
    loginGoogle,
    logout,
    refreshTokens,
    //forgotPassword,
    resetPassword,
    //sendVerificationEmail,
    verifyEmail,
};
