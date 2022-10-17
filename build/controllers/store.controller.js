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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
const error_service_1 = require("../services/error.service");
const store_service_1 = require("../services/store.service");
const errorService = new error_service_1.ErrorService();
const schoolService = new store_service_1.SchoolService(errorService);
const getBoardTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User data: ", req.userData);
    schoolService.getBoardTypes()
        .then((result) => {
        return res.status(200).json({
            types: result
        });
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
const getBoardTypeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getBoardTypeById(numericParamOrError)
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
const updateBoardTypeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body = req.body;
            schoolService.updateBoardTypeById({
                id: numericParamOrError,
                type: body.type
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
const addBoardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    schoolService.addBoardType({
        id: constants_1.NON_EXISTING_ID,
        type: body.type
    }, req.userData.userId)
        .then((result) => {
        return res.status(200).json(result);
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
const deleteBoardTypeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.deleteBoardTypeById(numericParamOrError, req.userData.userId)
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
// SQL injection made by sending the following as a parameter: <' OR 1=1 -- >
const getBoardTypeByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let title = req.params.title;
    schoolService.getBoardTypeByTitle(title)
        .then((result) => {
        return res.status(200).json(result);
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
exports.default = { getBoardTypes, getBoardTypeById, getBoardTypeByTitle, updateBoardTypeById, addBoardType, deleteBoardTypeById };
