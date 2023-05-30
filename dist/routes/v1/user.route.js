"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const validations_1 = require("../../validations");
const user_controller_1 = require("../../controllers/user.controller");
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)('manageUsers'), (0, validate_1.default)(validations_1.userValidation.createUser), user_controller_1.userController.createUser)
    .get((0, auth_1.default)('getUsers'), (0, validate_1.default)(validations_1.userValidation.getUsers), user_controller_1.userController.getUsers);
router
    .route('/:userId')
    .get((0, auth_1.default)('getUsers'), (0, validate_1.default)(validations_1.userValidation.getUser), user_controller_1.userController.getUser)
    .patch((0, auth_1.default)('manageUsers'), (0, validate_1.default)(validations_1.userValidation.updateUser), user_controller_1.userController.updateUser)
    .delete((0, auth_1.default)('manageUsers'), (0, validate_1.default)(validations_1.userValidation.deleteUser), user_controller_1.userController.deleteUser);
exports.default = router;
