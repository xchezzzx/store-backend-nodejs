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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../constants");
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
const error_service_1 = require("../services/error.service");
const user_service_1 = require("../services/user.service");
const errorService = new error_service_1.ErrorService();
const userService = new user_service_1.UserService(errorService);
const updateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body = req.body;
            userService.updateById({
                id: numericParamOrError,
                firstName: body.firstName,
                lastName: body.lastName,
            }, req.userData.userId)
                .then((result) => {
                return res.status(200).json(result);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const hashedPassword = bcryptjs_1.default.hashSync(body.password);
    userService.add({
        id: constants_1.NON_EXISTING_ID,
        firstName: body.firstName,
        lastName: body.lastName,
        login: body.login,
        password: hashedPassword
    }, req.userData.userId)
        .then((result) => {
        const returnedUser = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName
        };
        return res.status(200).json(result);
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            userService.deleteById(numericParamOrError, req.userData.userId)
                .then(() => {
                return res.sendStatus(200);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
exports.default = { updateById, add, deleteById };
