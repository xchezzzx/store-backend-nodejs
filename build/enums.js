"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.Role = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Active"] = 1] = "Active";
    Status[Status["NotActive"] = 2] = "NotActive";
})(Status = exports.Status || (exports.Status = {}));
var Role;
(function (Role) {
    Role[Role["Administrator"] = 1] = "Administrator";
    Role[Role["RegularUser"] = 2] = "RegularUser";
})(Role = exports.Role || (exports.Role = {}));
var AppError;
(function (AppError) {
    AppError["General"] = "General";
    AppError["ConnectionError"] = "ConnectionError";
    AppError["QueryError"] = "QueryError";
    AppError["NoData"] = "NoData";
    AppError["NonNumericInput"] = "NonNumeric";
    AppError["InputParametrsNotSupplied"] = "NoParameter";
    AppError["DeletionConflict"] = "DeletionConflict";
})(AppError = exports.AppError || (exports.AppError = {}));
