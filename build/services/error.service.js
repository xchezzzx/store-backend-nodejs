"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
const enums_1 = require("../enums");
class ErrorService {
    constructor() {
        this._error = {};
        this.initializeErrors();
    }
    getError(key) {
        return this._error[key];
    }
    initializeErrors() {
        this._error[enums_1.AppError.General] = {
            key: enums_1.AppError.General,
            code: 99,
            message: "General ERROR, DEBUG!"
        };
        this._error[enums_1.AppError.ConnectionError] = {
            key: enums_1.AppError.ConnectionError,
            code: 100,
            message: "DB server connection error"
        };
        this._error[enums_1.AppError.QueryError] = {
            key: enums_1.AppError.QueryError,
            code: 101,
            message: "Incorrect query"
        };
        this._error[enums_1.AppError.NoData] = {
            key: enums_1.AppError.NoData,
            code: 102,
            message: "Not found"
        };
        this._error[enums_1.AppError.NonNumericInput] = {
            key: enums_1.AppError.NonNumericInput,
            code: 103,
            message: "Non numeric input supplied"
        };
        this._error[enums_1.AppError.InputParametrsNotSupplied] = {
            key: enums_1.AppError.InputParametrsNotSupplied,
            code: 104,
            message: "Input parameter not supplied"
        };
        this._error[enums_1.AppError.DeletionConflict] = {
            key: enums_1.AppError.DeletionConflict,
            code: 105,
            message: "Delete failed due to conflict"
        };
    }
}
exports.ErrorService = ErrorService;
