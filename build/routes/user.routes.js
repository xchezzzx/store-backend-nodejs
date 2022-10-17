"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const enums_1 = require("../enums");
const authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
const router = express_1.default.Router();
router.post('/', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator]), user_controller_1.default.add);
router.put('/:id', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator]), user_controller_1.default.updateById);
router.delete('/:id', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator]), user_controller_1.default.deleteById);
exports.default = { router };
