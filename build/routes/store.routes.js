"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_controller_1 = __importDefault(require("../controllers/store.controller"));
const enums_1 = require("../enums");
const authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
const router = express_1.default.Router();
router.get('/board-types', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.getBoardTypes);
router.get('/board-type/:id', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.getBoardTypeById);
router.get('/board-type-by-title/:title', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.getBoardTypeByTitle);
router.put('/board-type/:id', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.updateBoardTypeById);
router.post('/board-type', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.addBoardType);
router.delete('/board-type/:id', authentication_middleware_1.default.verifyToken([enums_1.Role.Administrator, enums_1.Role.RegularUser]), store_controller_1.default.deleteBoardTypeById);
exports.default = { router };
