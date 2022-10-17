"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHelper = void 0;
const constants_1 = require("../constants");
const enums_1 = require("../enums");
class RequestHelper {
    static ParseNumericInput(errorService, input) {
        let result = constants_1.NON_EXISTING_ID;
        if (isNaN(Number(input))) {
            return errorService.getError(enums_1.AppError.NonNumericInput);
        }
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return errorService.getError(enums_1.AppError.InputParametrsNotSupplied);
        }
        return result;
    }
}
exports.RequestHelper = RequestHelper;
