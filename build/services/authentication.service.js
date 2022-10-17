"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const constants_1 = require("../constants");
const sql_helper_1 = require("../helpers/sql.helper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const enums_1 = require("../enums");
class AuthenticationService {
    constructor(errorService) {
        this.errorService = errorService;
    }
    login(login, password) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQuerySingleResult(this.errorService, constants_1.Queries.GetUserByLogin, login)
                .then((user) => {
                if (bcryptjs_1.default.compareSync(password, user.password)) {
                    const result = {
                        userId: user.id,
                        roleId: user.role_id
                    };
                    resolve(result);
                }
                else {
                    reject(this.errorService.getError(enums_1.AppError.NoData));
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
