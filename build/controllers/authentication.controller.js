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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_service_1 = require("../services/error.service");
const authentication_service_1 = require("../services/authentication.service");
const response_helper_1 = require("../helpers/response.helper");
const constants_1 = require("../constants");
const errorService = new error_service_1.ErrorService();
const authenticationService = new authentication_service_1.AuthenticationService(errorService);
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    authenticationService.login(user.login, user.password)
        .then((userData) => {
        const authenticationToken = {
            userData: userData
        };
        const token = jsonwebtoken_1.default.sign(authenticationToken, constants_1.TOKEN_SECRET, {
            expiresIn: "2h",
        });
        return res.status(200).json({
            token: token
        });
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error, true);
    });
});
exports.default = { login };
