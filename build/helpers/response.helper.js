"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
const enums_1 = require("../enums");
class ResponseHelper {
    static handleError(response, error, isAuthentication = false) {
        switch (error.key) {
            case enums_1.AppError.ConnectionError:
                return response.status(408).json({
                    errorMessage: error.message
                });
            case enums_1.AppError.QueryError:
            case enums_1.AppError.NonNumericInput:
                return response.status(406).json({
                    errorMessage: error.message
                });
            case enums_1.AppError.NoData:
                if (isAuthentication) {
                    return response.sendStatus(403);
                }
                else {
                    return response.status(404).json({
                        errorMessage: error.message
                    });
                }
            default:
                return response.status(400).json({
                    errorMessage: error.message
                });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
